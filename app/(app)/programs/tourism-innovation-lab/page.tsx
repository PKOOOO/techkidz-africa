import Link from "next/link";
import { ArrowLeft, Laptop, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Tourism Innovation Lab | Swahilipot Hub Foundation",
    description: "Transforming tourism through technology and innovation at the coastal region.",
};

const features = [
    "Digital solutions for tourism challenges",
    "Startup incubation and mentorship",
    "Tech training for tourism sector",
    "Sustainable tourism initiatives",
    "Industry partnerships",
    "Hackathons and innovation challenges",
];

export default function TourismInnovationLabPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/programs" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Laptop size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Tourism <span className="text-gradient-blue">Innovation Lab</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Leveraging technology to transform the tourism industry in the coastal region, creating digital solutions that enhance visitor experiences and promote sustainable tourism.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">What We Do</h2>
                            <ul className="space-y-4">
                                {features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Innovation Focus</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Developing apps and platforms for tourism</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Creating immersive digital experiences</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Building data-driven tourism solutions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Join the Innovation</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Be part of the movement transforming tourism through technology.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">Get Involved</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
