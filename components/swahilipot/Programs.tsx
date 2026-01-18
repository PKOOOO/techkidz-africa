import Link from "next/link";
import { ArrowRight, Code, Shield, Bot, Film, Gamepad2, Monitor, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

const iconMap: Record<string, LucideIcon> = {
    Code,
    Shield,
    Bot,
    Film,
    Gamepad2,
    Monitor,
};

async function getPrograms() {
    const query = `*[_type == "programsPage" && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        href,
        iconName,
        order
    }`;
    
    return await client.fetch(query);
}

export async function Programs() {
    let programs: any[] = [];
    
    try {
        programs = await getPrograms();
    } catch (error) {
        console.error("Error fetching programs:", error);
    }
    return (
        <section id="programs" className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our <span className="text-gradient-blue">Programs</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our initiatives designed to empower youth through technology,
                        creativity, and entrepreneurship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
                    {programs.map((program, index) => {
                        const IconComponent = iconMap[program.iconName] || Code;
                        return (
                            <ProgramFeature 
                                key={program._id || program.href} 
                                title={program.title}
                                description={program.description}
                                icon={IconComponent}
                                href={program.href}
                                index={index}
                            />
                        );
                    })}
                </div>

                <div className="text-center mt-10">
                    <Button className="bg-swahilipot-600 hover:bg-swahilipot-700 text-white" asChild>
                        <Link href="/programs">
                            View All Programs <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

const ProgramFeature = ({
    title,
    description,
    icon: IconComponent,
    href,
    index,
}: {
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    href: string;
    index: number;
}) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200 dark:border-neutral-800 cursor-pointer",
                (index === 0 || index === 3) && "lg:border-l border-neutral-200 dark:border-neutral-800",
                index < 3 && "lg:border-b border-neutral-200 dark:border-neutral-800"
            )}
        >
            {index < 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#6A1383]/10 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#6A1383]/10 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-[#6A1383] dark:text-neutral-400">
                <IconComponent size={24} />
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-gradient-to-b group-hover/feature:from-[#6A1383] group-hover/feature:to-[#38B6FF] transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </Link>
    );
};
