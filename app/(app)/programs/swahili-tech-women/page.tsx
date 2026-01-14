import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Swahili Tech Women | Swahilipot Hub Foundation",
    description: "Empowering women in technology and STEM fields across East Africa.",
};

const offerings = [
    "Tech skills training and bootcamps",
    "Mentorship from women in tech",
    "Networking and community support",
    "Leadership development",
    "Access to job opportunities",
    "Scholarships and sponsorships",
];

export default function SwahiliTechWomenPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/programs" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Heart size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Swahili <span className="text-gradient-blue">Tech Women</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Empowering women to break into and thrive in technology and STEM careers. We provide training, mentorship, and a supportive community.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
                            <ul className="space-y-4">
                                {offerings.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Hundreds of women trained in tech skills</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Growing community of women techies</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Success stories in tech careers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Join the Community</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Be part of a growing community of women in technology.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">Get Started</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
