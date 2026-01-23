"use client";

import Link from "next/link";
import { motion } from "motion/react";

type CareerListItem = {
    _id: string;
    title: string;
    slug: string;
    type?: string | null;
    location?: string | null;
};

const formatType = (value?: string | null) => {
    if (!value) return null;
    return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

export default function CareersList({ careers }: { careers: CareerListItem[] }) {
    return (
        <ul className="max-w-2xl mx-auto w-full flex flex-col gap-4">
            {careers.map((career) => {
                const typeLabel = formatType(career.type);
                return (
                    <li key={career._id}>
                        <Link href={`/careers/${career.slug}`} className="block">
                            <motion.div
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="p-4 flex flex-col md:flex-row justify-between items-center rounded-xl border bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 cursor-pointer"
                            >
                                <div className="flex flex-col gap-2 text-center md:text-left">
                                    <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                                        {career.title}
                                    </div>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-neutral-500">
                                        {typeLabel ? <span>{typeLabel}</span> : null}
                                        {career.location ? <span>{career.location}</span> : null}
                                    </div>
                                </div>
                                <span className="mt-4 md:mt-0 px-4 py-2 text-sm rounded-full font-semibold bg-gray-100 hover:bg-swahilipot-600 hover:text-white text-black transition-colors">
                                    Apply
                                </span>
                            </motion.div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
