import { Impact } from "@/components/swahilipot";
import Carousel from "@/components/ui/carousel2";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getImpactHeroImage() {
    const query = `*[_type == "impactHeroImage" && isActive == true][0] {
        image
    }`;
    
    const result = await client.fetch(query);
    if (result?.image) {
        return urlFor(result.image).url();
    }
    return null;
}

async function getImpactStats() {
    const query = `*[_type == "impactStat" && isActive == true] | order(order asc) {
        _id,
        value,
        label,
        iconName,
        description,
        order
    }`;
    
    return await client.fetch(query);
}

async function getTeamMembers() {
    const query = `*[_type == "teamMember" && (!defined(isActive) || isActive == true)] | order(order asc) {
        _id,
        name,
        role,
        bio,
        image
    }`;

    const members = await client.fetch(query);
    return members.map((member: any) => ({
        ...member,
        imageUrl: member.image ? urlFor(member.image).width(800).height(800).url() : "/images/team/placeholder.jpg",
    }));
}

async function getTestimonials() {
    const query = `*[_type == "testimonial" && (!defined(isActive) || isActive == true)] | order(order asc) {
        _id,
        name,
        designation,
        quote,
        image
    }`;

    const testimonials = await client.fetch(query);
    return testimonials.map((item: any) => ({
        ...item,
        imageUrl: item.image ? urlFor(item.image).width(800).height(800).url() : undefined,
    }));
}

async function getPartners() {
    const query = `*[_type == "partner"] | order(order asc) {
        _id,
        logo
    }`;

    const partners = await client.fetch(query);
    return partners
        .filter((partner: any) => partner.logo)
        .map((partner: any) => ({
            imageUrl: urlFor(partner.logo).width(400).height(300).fit("max").url(),
        }));
}

export const metadata = {
    title: "Our Impact | Tech Kidz Africa",
    description: "See Tech Kidz Africa is making a difference in the lives of young people across East Africa.",
};

export default async function ImpactPage() {
    let heroImageUrl: string | null = null;
    let impactStats: any[] = [];
    let teamMembers: any[] = [];
    let testimonials: any[] = [];
    let partners: any[] = [];
    
    try {
        heroImageUrl = await getImpactHeroImage();
        impactStats = await getImpactStats();
        teamMembers = await getTeamMembers();
        testimonials = await getTestimonials();
        partners = await getPartners();
    } catch (error) {
        console.error("Error fetching impact data:", error);
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[300px] md:h-[400px] z-0">
                {/* Background Image */}
                {heroImageUrl && (
                    <div className="absolute inset-0 z-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${heroImageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
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
                            Our <span className="text-gradient-blue">Impact</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <div className="relative pt-8 md:pt-12">
                <Impact stats={impactStats} />
            </div>

            {/* Team Carousel */}
            {teamMembers.length > 0 && (
                <section className="section-padding bg-white dark:bg-neutral-950 overflow-x-hidden">
                    <div className="container-custom text-center overflow-x-hidden">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our <span className="text-gradient-blue">Team</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                            Meet the leaders behind the impact. Tap to explore their vision.
                        </p>
                        <div className="flex justify-center">
                            <Carousel
                                slides={teamMembers.map((member) => ({
                                    title: member.name,
                                    role: member.role,
                                    vision: member.bio || undefined,
                                    src: member.imageUrl,
                                }))}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Success Stories */}
            {testimonials.length > 0 && (
                <section className="section-padding bg-gray-50 dark:bg-neutral-950">
                    <div className="container-custom">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                Success <span className="text-gradient-blue">Stories</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Real stories of transformation from our community members.
                            </p>
                            </div>
                        <AnimatedTestimonials
                            testimonials={testimonials.map((item) => ({
                                quote: item.quote,
                                name: item.name,
                                designation: item.designation,
                                src: item.imageUrl || "https://via.placeholder.com/500",
                            }))}
                            autoplay
                        />
                    </div>
                </section>
            )}

            {/* Partnerships (Infinite Moving Cards) */}
            {partners.length > 0 && (
                <section className="section-padding bg-white dark:bg-neutral-950">
                    <div className="container-custom">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                Our <span className="text-gradient-blue">Partnerships</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Organizations that walk with us to create lasting impact.
                            </p>
                        </div>
                        <div className="h-[160px] md:h-[190px] rounded-md flex items-center justify-center relative overflow-hidden">
                            <InfiniteMovingCards
                                items={partners}
                                direction="right"
                                speed="normal"
                            />
                    </div>
                </div>
            </section>
            )}
        </>
    );
}
