import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
    return (
        <section id="about" className="section-padding bg-swahilipot-50">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        About <span className="text-gradient-blue">Tech Kidz Africa</span>
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                    Tech Kidz Africa is an edtech Academy, innovation hub and social enterprise that nurtures the spirit of innovativeness through empowering learners,capacity building educators, digital learning resources development and offering digital literacy employability skills.
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        Our mission is to empower the next generation of leaders, innovators, and creators
                        by providing access to resources, mentorship, and opportunities that transform lives
                        and communities.
                    </p>
                    <Button className="bg-swahilipot-600 hover:bg-swahilipot-700 text-white" asChild>
                        <Link href="/about">
                            Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
