"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { NoiseBackground } from "@/components/ui/noise-background";

interface ProgramItem {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    content?: any[];
    ctaText?: string;
    ctaLink?: string;
}

interface ProgramExpandableCardsProps {
    items: ProgramItem[];
}

export function ProgramExpandableCards({ items }: ProgramExpandableCardsProps) {
    const [active, setActive] = useState<ProgramItem | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">
                    No program items available yet. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active ? (
                    <div key={`modal-${active._id}-${id}`} className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active._id}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.05 }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[101]"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <NoiseBackground
                                gradientColors={[
                                    "rgb(106, 19, 131)", // #6A1383 - brand purple
                                    "rgb(56, 182, 255)",  // #38B6FF - brand blue
                                    "rgb(138, 43, 226)",  // purple accent
                                ]}
                                containerClassName="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%]"
                            >
                                <motion.div
                                    layoutId={`card-${active._id}-${id}`}
                                    ref={ref}
                                    className="w-full h-full flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden"
                                >
                                <motion.div layoutId={`image-${active._id}-${id}`}>
                                    <Image
                                        src={active.imageUrl}
                                        alt={active.title}
                                        width={800}
                                        height={450}
                                        className="w-full h-auto rounded-t-lg object-contain object-center bg-black/90"
                                    />
                                </motion.div>

                                <div>
                                    {/* Title + short description */}
                                    <div className="p-4 text-center md:text-left">
                                        <motion.h3
                                            layoutId={`title-${active._id}-${id}`}
                                            className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active._id}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 text-base mt-1"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    {/* Long rich description */}
                                    {active.content && active.content.length > 0 && (
                                        <div className="pt-0 pb-4 px-4">
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-6 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                            >
                                                <PortableText
                                                    value={active.content}
                                                    components={{
                                                        block: {
                                                            normal: ({ children }) => (
                                                                <p className="mb-4">{children}</p>
                                                            ),
                                                            h1: ({ children }) => (
                                                                <h1 className="text-xl font-bold mb-3">{children}</h1>
                                                            ),
                                                            h2: ({ children }) => (
                                                                <h2 className="text-lg font-semibold mb-2">{children}</h2>
                                                            ),
                                                            h3: ({ children }) => (
                                                                <h3 className="text-base font-medium mb-2">{children}</h3>
                                                            ),
                                                        },
                                                        list: {
                                                            bullet: ({ children }) => (
                                                                <ul className="list-disc pl-5 mb-4">{children}</ul>
                                                            ),
                                                            number: ({ children }) => (
                                                                <ol className="list-decimal pl-5 mb-4">{children}</ol>
                                                            ),
                                                        },
                                                    }}
                                                />
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* CTA below long description, centered on all devices */}
                                    {active.ctaLink && active.ctaText && (
                                        <div className="px-4 pb-6 flex justify-center">
                                            <motion.a
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                href={active.ctaLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-3 text-sm rounded-full font-bold bg-[#6A1383] hover:bg-[#5a0f70] text-white transition-colors text-center"
                                            >
                                                {active.ctaText}
                                            </motion.a>
                                        </div>
                                    )}
                                </div>
                                </motion.div>
                            </NoiseBackground>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                {items.map((item) => (
                    <NoiseBackground
                        key={item._id}
                        gradientColors={[
                            "rgb(106, 19, 131)", // #6A1383 - brand purple
                            "rgb(56, 182, 255)",  // #38B6FF - brand blue
                            "rgb(138, 43, 226)",  // purple accent
                        ]}
                    >
                        <motion.div
                            layoutId={`card-${item._id}-${id}`}
                            onClick={() => setActive(item)}
                            className={`flex flex-col cursor-pointer h-full transition-opacity ${
                                active?._id === item._id ? "invisible pointer-events-none" : ""
                            }`}
                        >
                            <div className="flex gap-4 flex-col w-full">
                                <motion.div
                                    layoutId={`image-${item._id}-${id}`}
                                    className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        className="object-cover object-center"
                                    />
                                </motion.div>
                                <div className="flex justify-center items-center flex-col p-4">
                                    <motion.h3
                                        layoutId={`title-${item._id}-${id}`}
                                        className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${item._id}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </NoiseBackground>
                ))}
            </ul>
        </>
    );
}

const CloseIcon = () => {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};
