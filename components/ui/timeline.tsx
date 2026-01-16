"use client";
import React from "react";
import { TracingBeam } from "./tracing-beam";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  showHeader?: boolean;
}

export const Timeline = ({ data, title, description, showHeader = true }: TimelineProps) => {

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10">
      {showHeader && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
            {title || "Changelog from my journey"}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            {description || "I've been working on Aceternity for the past 2 years. Here's a timeline of my journey."}
          </p>
        </div>
      )}

      <TracingBeam className="px-6">
        <div className="max-w-7xl mx-auto antialiased pt-4 relative pb-20">
          {data.map((item, index) => (
            <div
              key={index}
              className={`mb-10 ${index === 0 ? 'mt-4 md:mt-8' : 'mt-10 md:mt-40'}`}
            >
              <h2 className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.title}
              </h2>
              <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
};
