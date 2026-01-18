import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { PortableText } from "@portabletext/react";
import { Code, Shield, Bot, Film, Gamepad2, Monitor, LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);
    
    if (!program) {
        return {
            title: "Program Not Found",
        };
    }
    
    return {
        title: `${program.title} | Swahilipot Hub Foundation`,
        description: program.description,
    };
}

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-[#38B6FF] mt-1 shrink-0"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                fill="currentColor"
                strokeWidth="0"
            />
        </svg>
    );
};

const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            const imageUrl = urlFor(value).url();
            return (
                <div className="my-8 rounded-lg overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={value.alt || "Program image"} 
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            );
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-2xl md:text-3xl font-bold mt-10 mb-4 bg-gradient-to-r from-[#6A1383] to-[#38B6FF] bg-clip-text text-transparent">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3 text-white">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-gray-200">
                {children}
            </h3>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-300 mt-4 leading-relaxed text-base">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-[#38B6FF] pl-4 my-6 italic text-gray-400 bg-neutral-900/50 py-3 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-none mt-4 space-y-3">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-none mt-4 space-y-3">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex gap-3 items-start">
                <CheckIcon />
                <span className="text-gray-300">{children}</span>
            </li>
        ),
        number: ({ children }: any) => (
            <li className="flex gap-3 items-start">
                <CheckIcon />
                <span className="text-gray-300">{children}</span>
            </li>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-white">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic text-gray-200">{children}</em>
        ),
        link: ({ value, children }: any) => {
            const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    className="text-[#38B6FF] hover:text-[#6A1383] underline underline-offset-2 transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
};


export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);
    
    if (!program) {
        notFound();
    }
    
    const Icon = iconMap[program.iconName] || Code;
    const heroImageUrl = program.heroImageUrl;

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[300px] md:h-[400px] z-0">
                {/* Background Image */}
                {heroImageUrl && (
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <div
                            className="h-[300px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${heroImageUrl})`,
                                opacity: 0.8,
                            }}
                        />
                    </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#6A1383]/5 z-0 h-[300px] md:h-[400px]" />
                
                {/* Bottom blur gradient - dark to match content section */}
                <div className="absolute bottom-0 z-30 inset-x-0 h-32 md:h-40 w-full pointer-events-none">
                    <div className="absolute inset-0 backdrop-blur-xl" style={{ maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.05) 95%, transparent 100%)' }} />
                    
                    {/* Text in middle of blur area */}
                    <div className="absolute inset-0 flex items-end justify-center pb-2 md:pb-4 z-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {program.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding bg-neutral-950">
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
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                {program.description}
                            </p>
                        </div>

                        {/* Rich Content with TracingBeam */}
                        {program.content && program.content.length > 0 ? (
                            <TracingBeam className="px-6">
                                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                                    <PortableText 
                                        value={program.content} 
                                        components={portableTextComponents}
                                    />
                                </div>
                            </TracingBeam>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400">
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
