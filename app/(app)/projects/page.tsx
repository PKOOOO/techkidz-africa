import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
    title: "Projects | Swahilipot Hub Foundation",
    description: "Explore our projects and initiatives making an impact in East Africa.",
};

async function getProjectsHeroImage() {
    const query = `*[_type == "projectsHeroImage" && isActive == true][0] {
        image
    }`;
    
    const result = await client.fetch(query);
    if (result?.image) {
        return urlFor(result.image).url();
    }
    return null;
}

async function getProjects() {
    const query = `*[_type == "project" && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        "slug": slug.current,
        cardImage
    }`;
    
    return await client.fetch(query);
}

function ProjectSkeleton({ project }: { project: { cardImage?: unknown; title: string } }) {
    const imageUrl = project.cardImage ? urlFor(project.cardImage).width(600).height(400).url() : null;
    
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-neutral-400">
                    No image
                </div>
            )}
        </div>
    );
}

export default async function ProjectsPage() {
    let heroImageUrl: string | null = null;
    let projects: any[] = [];
    
    try {
        heroImageUrl = await getProjectsHeroImage();
        projects = await getProjects();
    } catch (error) {
        console.error("Error fetching projects data:", error);
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
                    
                    {/* Text in middle of blur area */}
                    <div className="absolute inset-0 flex items-end justify-center pb-2 md:pb-4 z-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                            Our <span className="text-gradient-blue">Projects</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Projects Bento Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {projects.length > 0 ? (
                        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
                            {projects.map((project) => (
                                <BentoGridItem
                                    key={project._id}
                                    title={project.title}
                                    description={<span className="text-sm">{project.description}</span>}
                                    header={<ProjectSkeleton project={project} />}
                                    className={cn("[&>p:text-lg]", "md:col-span-1")}
                                    href={`/projects/${project.slug}`}
                                />
                            ))}
                        </BentoGrid>
                    ) : (
                        <p className="text-center text-gray-500">No projects found. Add some in Sanity Studio.</p>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Want to Collaborate?
                    </h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Partner with us on impactful projects that transform communities.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">
                            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
