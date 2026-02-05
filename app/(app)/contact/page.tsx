import { Contact } from "@/components/swahilipot";
import { ContactMap } from "@/components/app/ContactMap";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
    title: "Contact Us | Tech Kidz Africa",
    description: "Get in touch with Tech Kidz Africa. We're here to help.",
};

const ADDRESS = "Tech Kidz Africa, XM3M+7X8, Mombasa";
const LAT = -4.046889;
const LNG = 39.684778;

async function getContactHeroImage() {
    const query = `*[_type == "contactHeroImage" && isActive == true][0] {
        image
    }`;

    const result = await client.fetch(query);
    if (result?.image) {
        return urlFor(result.image).url();
    }
    return null;
}

export default async function ContactPage() {
    const token = process.env.MAPBOX_PUBLISHABLE_KEY;
    let heroImageUrl: string | null = null;

    try {
        heroImageUrl = await getContactHeroImage();
    } catch (error) {
        console.error("Error fetching contact hero image:", error);
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[300px] md:h-[560px] z-0">
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

              
                <div className="absolute inset-0 bg-[#6A1383]/5 z-0 h-[300px] md:h-[560px]" />

                {/* Bottom blur gradient */}
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
                </div>
            </section>

            {/* Title overlapping blur, above the intro text */}
            <div className="relative -mt-4 md:-mt-6 flex justify-center z-20">
                <h1 className="text-3xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                    Contact <span className="text-gradient-blue">Us</span>
                </h1>
            </div>

            <section className="section-padding pt-8 md:pt-10">
                <div className="container-custom">
                    <p className="text-center text-lg text-gray-700">
                        Have questions or want to collaborate? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <Contact />

            {/* Map Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                        <ContactMap accessToken={token} lat={LAT} lng={LNG} zoom={17} />
                    </div>
                    
                </div>
            </section>
        </>
    );
}
