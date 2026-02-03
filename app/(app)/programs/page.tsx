import Link from "next/link";
import { ArrowRight, Code, Shield, Bot, Film, Gamepad2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProgramSkeleton } from "@/components/app/ProgramSkeleton";

async function getProgramsHeroImage() {
    const query = `*[_type == "programsHeroImage" && isActive == true][0] {
        image
    }`;
    
    const result = await client.fetch(query);
    if (result?.image) {
        return urlFor(result.image).url();
    }
    return null;
}

async function getPrograms() {
    const query = `*[_type == "programsPage" && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        href,
        iconName,
        isAnimationTraining,
        svgImages[] {
            asset-> {
                _id,
                url,
                metadata {
                    dimensions
                }
            }
        },
        order
    }`;
    
    return await client.fetch(query);
}

export default async function ProgramsPage() {
    let heroImageUrl: string | null = null;
    let programs: any[] = [];
    
    try {
        heroImageUrl = await getProgramsHeroImage();
        programs = await getPrograms();
    } catch (error) {
        console.error("Error fetching programs data:", error);
    }

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
                
                {/* Bottom blur gradient */}
                <div className="absolute bottom-0 z-30 inset-x-0 h-24 md:h-32 w-full pointer-events-none">
                    <div className="absolute inset-0 backdrop-blur-lg" style={{ maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(255,255,255) 0%, rgb(255,255,255) 5%, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 90%, transparent 100%)', maskImage: 'linear-gradient(to top, black 0%, transparent 70%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 70%)' }} />
                </div>
            </section>

            {/* Title overlapping blur, above the cards */}
            <div className="relative -mt-4 md:-mt-6 flex justify-center z-20">
                <h1 className="text-3xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                    Our <span className="text-gradient-blue">Programs</span>
                </h1>
            </div>

           

            {/* Programs Bento Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
                        {programs.map((program, i) => {
                                            
                            return (
                                <BentoGridItem
                                    key={program._id || program.href}
                                    title={program.title}
                                    description={<span className="text-sm">{program.description}</span>}
                                    header={<ProgramSkeleton program={program} index={i} />}
                                    className={cn("[&>p:text-lg]", "md:col-span-1")}
                                   
                                    href={program.href}
                                />
                            );
                        })}
                    </BentoGrid>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Join our programs and take the first step towards building your future.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/industrial-attachment">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}