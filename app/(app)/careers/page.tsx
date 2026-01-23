import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CareersList from "@/components/app/CareersList";
import { client } from "@/sanity/lib/client";

export const metadata = {
    title: "Careers | Swahilipot Hub Foundation",
    description: "Join our team and help empower youth across East Africa.",
};

const getCareers = async () => {
    const query = `*[_type == "career" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        type,
        location,
    }`;

    return client.fetch(query);
};

export default async function CareersPage() {
    const careers = await getCareers();

    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Join Our <span className="text-gradient-blue">Team</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Be part of a passionate team dedicated to empowering youth across East Africa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>

                    {careers.length > 0 ? (
                        <CareersList careers={careers} />
                    ) : (
                        <p className="text-center text-gray-500">
                            No open positions at the moment. Check back soon!
                        </p>
                    )}
                </div>
            </section>

        </>
    );
}
