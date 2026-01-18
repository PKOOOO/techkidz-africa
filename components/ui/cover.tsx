"use client";
import React, { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

export const Cover = ({
  children,
  className,
  alwaysHovered = false,
}: {
  children?: React.ReactNode;
  className?: string;
  alwaysHovered?: boolean;
}) => {
  const [hovered, setHovered] = useState(alwaysHovered ? true : true);

  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10); // Adjust the divisor to control the spacing
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, [ref.current]);

  return (
    <div
      onMouseEnter={() => !alwaysHovered && setHovered(true)}
      onMouseLeave={() => !alwaysHovered && setHovered(true)}
      ref={ref}
      className={cn(
        "relative bg-[#6A1383]/20 backdrop-blur-sm group/cover inline-block px-2 py-2 transition duration-200 rounded-sm",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="h-full w-full overflow-hidden absolute inset-0"
      >
        <motion.div
          animate={{
            translateX: ["-50%", "0%"],
          }}
          transition={{
            translateX: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          className="w-[200%] h-full flex"
        >
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={500}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={500}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </motion.div>
      </motion.div>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={containerWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          y: [0, -10, 5, -8, 3, 0],
          x: [0, 5, -3, 8, -5, 0],
          rotate: [0, 2, -1, 1.5, -0.5, 0],
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          y: {
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          x: {
            duration: 7,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        className={cn(
          "dark:text-white inline-block text-white relative z-20 transition duration-200",
          className
        )}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-[2px] -top-[2px] z-30" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px] z-30" delay={0.4} />
      <CircleIcon className="absolute -left-[2px] -top-[2px] z-30" delay={0.8} />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px] z-30" delay={1.6} />
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1,
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

export const CircleIcon = ({
  className,
  delay,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <div
      className={cn(
        `pointer-events-none animate-pulse h-2.5 w-2.5 rounded-full bg-white opacity-100 z-30 shadow-lg`,
        className
      )}
    ></div>
  );
};
