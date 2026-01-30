"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote?: string;
    name?: string;
    title?: string;
    imageUrl?: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "shrink-0 rounded-xl bg-white shadow-sm border flex items-center justify-center",
              item.imageUrl
                ? "w-[220px] md:w-[280px] h-[130px] md:h-[160px] px-5 py-4"
                : "w-[350px] md:w-[450px] px-8 py-6"
            )}
            key={item.imageUrl || item.name || idx}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt="Partner logo"
                className="max-h-[80px] md:max-h-[110px] max-w-[85%] object-contain"
              />
            ) : (
              <blockquote className="w-full">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              {item.icon && (
                <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon size={24} />
                </div>
              )}

                {item.name && (
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.name}</h3>
                )}
                {item.quote && (
              <p className="text-gray-600 text-sm leading-[1.6]">
                {item.quote}
              </p>
                )}
            </blockquote>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
