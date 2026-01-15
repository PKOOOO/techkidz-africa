"use client";

import { Rocket, Eye } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function MissionVisionGlowing() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-2 lg:gap-12">
            <GridItem
                area=""
                icon={<Rocket className="h-6 w-6 text-white" />}
                title="Our Mission"
                description="Tech kidz Africa exists to improve young generation creativity and innovation in technology and enhance modern skill-sets through robotics, coding and artificial intelligence."
                color="bg-swahilipot-600"
            />

            <GridItem
                area=""
                icon={<Eye className="h-6 w-6 text-white" />}
                title="Our Vision"
                description="Empowering Future Innovators"
                color="bg-swahilipot-900"
            />
        </ul>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    color: string;
}

const GridItem = ({ area, icon, title, description, color }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-white dark:bg-black">
                <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className={`border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 ${color} text-white`}>
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/10">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 font-sans text-xl/[1.375rem] font-bold text-white md:text-2xl/[1.875rem]">
                                {title}
                            </h3>
                            <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-swahilipot-100">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
