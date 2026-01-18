"use client";

import { motion } from "motion/react";
import { Cover } from "@/components/ui/cover";
import { Code, Shield, Bot, Film, Gamepad2, Monitor, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Code,
    Shield,
    Bot,
    Film,
    Gamepad2,
    Monitor,
};

type Program = {
    title: string;
    description: string;
    href: string;
    iconName: string;
    className?: string;
    isAnimationTraining?: boolean;
    svgImages?: Array<{
        asset?: {
            _id: string;
            url: string;
            metadata?: {
                dimensions?: {
                    width: number;
                    height: number;
                };
            };
        };
    }>;
};

export const ProgramSkeleton = ({ program, index }: { program: Program; index: number }) => {
  const Icon = iconMap[program.iconName] || Code;
  
  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const gradientVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Check for Animation Training with SVGs FIRST (before index-based checks)
  if (program.isAnimationTraining && program.svgImages && program.svgImages.length > 0) {
    // Animation Training card with SVG images from Sanity in Cover (space box) effect with motion
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg overflow-hidden">
        <Cover className="!flex w-full h-full items-center justify-center gap-6" alwaysHovered>
          {program.svgImages.map((svgImage, idx) => {
            const imageUrl = svgImage.asset?.url;
            if (!imageUrl || !svgImage.asset) return null;
            
            // First image gets cat-like animation, second gets rocket-like animation
            const isFirst = idx === 0;
            return (
              <motion.img 
                key={svgImage.asset._id || idx}
                src={imageUrl} 
                alt={`Animation ${idx + 1}`} 
                className={`w-18 h-18 md:w-20 md:h-20 object-contain ${isFirst ? 'rotate-[-10deg]' : ''}`}
                animate={isFirst ? {
                  y: [0, -8, 0, 8, 0],
                  x: [0, 5, 0, -5, 0],
                  rotate: [60, 65, 60, 55, 60],
                } : {
                  y: [0, -12, 0],
                  rotate: [90, 95, 90, 85, 90],
                  scale: [1, 1.05, 1],
                }}
                transition={isFirst ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </Cover>
      </div>
    );
  }

  // Different skeleton styles for variety (excluding Animation Training)
  if (index === 0 || index === 2) {
    // Animated gradient background
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={gradientVariants}
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
        style={{
          background: `linear-gradient(-45deg, #6A1383, #38B6FF, #80569E, #6A1383)`,
          backgroundSize: "400% 400%",
        }}
      >
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="h-full w-full flex items-center justify-center"
        >
          <Icon size={48} className="text-white opacity-80" />
        </motion.div>
      </motion.div>
    );
  }

  if (index === 1 || index === 4) {
    // Dot pattern with icon
    return (
      <motion.div
        initial="initial"
        whileHover="hover"
        variants={iconVariants}
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center rounded-lg"
      >
        <div className="bg-gradient-to-br from-[#6A1383] to-[#38B6FF] p-6 rounded-xl">
          <Icon size={48} className="text-white" />
        </div>
      </motion.div>
    );
  }

  // Default: Simple icon with animated background
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={iconVariants}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-[#6A1383]/20 to-[#38B6FF]/20 flex-col items-center justify-center"
    >
      <div className="bg-white dark:bg-black p-4 rounded-xl shadow-lg">
        <Icon size={40} className="text-[#6A1383]" />
      </div>
    </motion.div>
  );
};
