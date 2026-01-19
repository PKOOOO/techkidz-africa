import { Impact } from "@/components/swahilipot";
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

export const metadata = {
    title: "Our Impact | Swahilipot Hub Foundation",
    description: "See how Swahilipot Hub is making a difference in the lives of young people across East Africa.",
};

export default async function ImpactPage() {
    let heroImageUrl: string | null = null;
    let impactStats: any[] = [];
    
    try {
        heroImageUrl = await getImpactHeroImage();
        impactStats = await getImpactStats();
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

            {/* Success Stories */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Success <span className="text-gradient-blue">Stories</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Real stories of transformation from our community members.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-swahilipot-100 mx-auto mb-4" />
                                <p className="text-gray-600 text-center mb-4 italic">
                                    "Swahilipot Hub changed my life. The skills I gained helped me land my dream job."
                                </p>
                                <p className="text-center font-semibold">Success Story {i}</p>
                                <p className="text-center text-sm text-gray-500">Program Graduate</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
