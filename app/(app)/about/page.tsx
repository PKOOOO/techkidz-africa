import Image from "next/image";
import { Briefcase, Star, Lightbulb, ShieldCheck } from "lucide-react";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import MissionVisionGlowing from "@/components/mission-vision-glowing";
import OurStoryMeteors from "@/components/our-story-meteors";

export const metadata = {
    title: "About Us | Tech kidz Africa",
    description: "Learn about Tech kidz Africa's mission to empower youth through technology, arts, and entrepreneurship.",
};



export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About <span className="text-gradient-blue">Techkidz Africa</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Tech Kidz Africa is an edtech Academy, innovation hub and social enterprise that nurtures the spirit of innovativeness through empowering learners,capacity building educators, digital learning resources development and offering digital literacy employability skills.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding">
                <div className="container-custom">
                    <MissionVisionGlowing />
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our <span className="text-gradient-blue">Values</span>
                        </h2>
                    </div>

                    <div className="w-full">
                        <InfiniteMovingCardsDemo />
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our <span className="text-gradient-blue">Story</span>
                        </h2>
                        <OurStoryMeteors />
                    </div>
                </div>
            </section>
        </>
    );
}
