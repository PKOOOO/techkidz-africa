import Link from "next/link";
import { ArrowLeft, Users, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Case Management | Swahilipot Hub Foundation",
    description: "Personalized youth support and guidance through our Case Management program.",
};

const benefits = [
    "One-on-one mentorship sessions",
    "Career counseling and guidance",
    "Life skills training",
    "Goal setting and tracking",
    "Networking opportunities",
    "Access to resources and tools",
];

export default function CaseManagementPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/programs" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Users size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Case <span className="text-gradient-blue">Management</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Our Case Management program provides personalized support and guidance to help young people navigate their personal and professional journeys.
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
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Program Goals</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Target className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Empower youth to identify and pursue their goals</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Target className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Build essential life and professional skills</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Target className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Create pathways to employment and education</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Join our Case Management program and take the first step towards achieving your goals.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
