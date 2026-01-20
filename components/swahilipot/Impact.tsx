"use client";

import { FolderKanban, GraduationCap, UserCheck, MapPin, LucideIcon } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const iconMap: Record<string, LucideIcon> = {
    Projects: FolderKanban,
    Learners: GraduationCap,
    Mentors: UserCheck,
    KenyaCounty: MapPin,
};

type ImpactStat = {
    _id: string;
    value: string;
    label: string;
    iconName: string;
    description?: string;
};

type ImpactProps = {
    stats: ImpactStat[];
};

export function Impact({ stats }: ImpactProps) {
    // Safety check: if stats is undefined or empty, return early
    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <section id="impact" className="pt-16 md:pt-24 pb-4 md:pb-6 bg-white dark:bg-swahilipot-900">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {stats.map((stat) => {
                        const Icon = iconMap[stat.iconName] || FolderKanban;
                        return (
                            <div
                                key={stat._id}
                                className="bg-white dark:bg-swahilipot-800 rounded-xl p-8 text-center border border-neutral-200 dark:border-swahilipot-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="bg-gradient-to-br from-[#6A1383] to-[#38B6FF] text-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <Icon size={28} />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6A1383] to-[#38B6FF] bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                                    <PointerHighlight
                                        rectangleClassName="bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 leading-loose"
                                        pointerClassName="text-[#6A1383] h-3 w-3"
                                        containerClassName="inline-block"
                                    >
                                        <span className="relative z-10">{stat.label}</span>
                                    </PointerHighlight>
                                </div>
                                {stat.description && (
                                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                                        {stat.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
