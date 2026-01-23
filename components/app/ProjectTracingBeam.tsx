"use client";

import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { PortableText } from "@portabletext/react";

type Section = {
    _key: string;
    badge?: string;
    title: string;
    content?: unknown[];
    imageUrl?: string | null;
};

type ProjectTracingBeamProps = {
    sections: Section[];
};

export function ProjectTracingBeam({ sections }: ProjectTracingBeamProps) {
    return (
        <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {sections.map((section) => (
                    <div key={section._key} className="mb-10">
                        {section.badge && (
                            <h2 className="bg-swahilipot-600 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                                {section.badge}
                            </h2>
                        )}

                        <p className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                            {section.title}
                        </p>

                        <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                            {section.imageUrl && (
                                <img
                                    src={section.imageUrl}
                                    alt={section.title}
                                    className="rounded-lg mb-6 object-cover w-full"
                                />
                            )}
                            {section.content && (
                                <div className="text-gray-700 dark:text-gray-300">
                                    <PortableText value={section.content as any} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </TracingBeam>
    );
}
