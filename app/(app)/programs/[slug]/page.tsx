import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Code, Shield, Bot, Film, Gamepad2, Monitor, LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { ProgramExpandableCards } from "@/components/app/ProgramExpandableCards";

const iconMap: Record<string, LucideIcon> = {
    Code,
    Shield,
    Bot,
    Film,
    Gamepad2,
    Monitor,
};

async function getProgramBySlug(slug: string) {
    // Match the href format stored in Sanity (e.g., "/programs/web-development")
    const href = `/programs/${slug}`;
    
    const query = `*[_type == "programsPage" && href == $href && isActive == true][0] {
        _id,
        title,
        description,
        href,
        iconName,
        heroImage,
        content,
        isAnimationTraining,
        svgImages[] {
            asset-> {
                _id,
                url,
                metadata {
                    dimensions
                }
            }
        }
    }`;
    
    const result = await client.fetch(query, { href });
    
    if (result?.heroImage) {
        result.heroImageUrl = urlFor(result.heroImage).url();
    }
    
    return result;
}

async function getProgramItems(programId: string) {
    const query = `*[_type == "programItem" && program._ref == $programId && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        image,
        content,
        ctaText,
        ctaLink,
        order
    }`;
    
    const items = await client.fetch(query, { programId });
    
    // Process items: convert images to URLs
    return items.map((item: any) => ({
        ...item,
        imageUrl: item.image ? urlFor(item.image).url() : "",
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);
    
    if (!program) {
        return {
            title: "Program Not Found",
        };
    }
    
    return {
        title: `${program.title} | Tech Kidz Africa`,
        description: program.description,
    };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);
    
    if (!program) {
        notFound();
    }
    
    const Icon = iconMap[program.iconName] || Code;
    const heroImageUrl = program.heroImageUrl;
    
    // Fetch program items/modules
    let programItems: any[] = [];
    try {
        programItems = await getProgramItems(program._id);
    } catch (error) {
        console.error("Error fetching program items:", error);
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-visible h-[300px] md:h-[560px] z-20">
                {/* Background Image */}
                {heroImageUrl && (
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <div
                            className="h-[300px] md:h-[560px] w-full bg-cover bg-center md:bg-[position:50%_20%] bg-no-repeat"
                            style={{
                                backgroundImage: `url(${heroImageUrl})`,
                                opacity: 0.8,
                            }}
                        />
                    </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#6A1383]/5 z-0 h-[300px] md:h-[560px]" />
                
                {/* Bottom blur gradient - light blend into white content (match Projects page) */}
                <div className="absolute bottom-0 z-30 inset-x-0 h-24 md:h-32 w-full pointer-events-none">
                    <div
                        className="absolute inset-0 backdrop-blur-lg"
                        style={{
                            maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to top, rgb(255,255,255) 0%, rgb(255,255,255) 5%, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 90%, transparent 100%)",
                            maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                        }}
                    />

                    {/* Text in middle of blur area */}
                    <div className="absolute inset-0 flex items-end justify-center pb-2 md:pb-4 z-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                            {program.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding bg-white dark:bg-neutral-950 relative pt-20 md:pt-24">
                <div className="container-custom">
                    <Link 
                        href="/programs" 
                        className="inline-flex items-center text-[#6A1383] hover:text-[#38B6FF] mb-8 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        {/* Program Icon and Short Description */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-br from-[#6A1383] to-[#38B6FF] text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <Icon size={32} />
                            </div>
                            <p className="text-lg md:text-xl text-neutral-700 dark:text-gray-300 leading-relaxed">
                                {program.description}
                            </p>
                        </div>

                        {/* Program Items/Modules with Expandable Cards */}
                        {programItems.length > 0 ? (
                            <div className="mt-12">
                                <ProgramExpandableCards items={programItems} />
                            </div>
                        ) : program.content && program.content.length > 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-600 dark:text-gray-400 mb-4">
                                    Program modules coming soon...
                                </p>
                                <p className="text-sm text-neutral-500 dark:text-gray-500">
                                    Check back later for detailed program content.
                                </p>
                                </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-neutral-600 dark:text-gray-400">
                                    Detailed content coming soon...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
}
