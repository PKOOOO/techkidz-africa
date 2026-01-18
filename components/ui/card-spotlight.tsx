"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Always visible dot matrix background */}
      <div className="pointer-events-none absolute z-0 inset-0">
        <CanvasRevealEffect
          animationSpeed={0.4}
          containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          colors={[
            [106, 19, 131], // #6A1383 - brand purple
            [56, 182, 255],  // #38B6FF - brand blue
          ]}
          dotSize={4}
          opacities={[0.5, 0.5, 0.5, 0.7, 0.7, 0.7, 0.9, 0.9, 0.9, 1]}
          showGradient={false}
        />
      </div>
      
      {/* Spotlight effect on hover */}
      <motion.div
        className="pointer-events-none absolute z-10 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [106, 19, 131], // #6A1383 - brand purple
              [56, 182, 255],  // #38B6FF - brand blue
            ]}
            dotSize={3}
            showGradient={false}
          />
        )}
      </motion.div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};
