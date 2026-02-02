import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Industrial Attachment | Tech Kidz Africa",
    description: "Apply for industrial attachment at Tech Kidz Africa and gain hands-on experience.",
};

const benefits = [
    "Hands-on experience in your field of study",
    "Mentorship from industry professionals",
    "Exposure to real-world projects",
    "Networking opportunities",
    "Certificate of completion",
    "Potential for employment",
];

const departments = [
    { name: "Tech & Engineering", description: "Software development, IT support, data analysis" },
    { name: "Communication", description: "Content creation, social media, PR" },
    { name: "Creatives", description: "Graphic design, video production, photography" },
    { name: "Community & Entrepreneurship", description: "Event management, community outreach" },
];

export default function IndustrialAttachmentPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Industrial <span className="text-gradient-blue">Attachment</span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Join Swahilipot Hub for a transformative industrial attachment experience.
                            Gain practical skills and mentorship in your field of study.
                        </p>
                        <Button className="bg-swahilipot-600 hover:bg-swahilipot-700 text-white text-lg px-8 py-3" asChild>
                            <Link href="/industrial-attachment/apply">
                                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Quick Info */}
            <section className="py-8 bg-white border-b">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center">
                                <Clock size={24} />
                            </div>
                            <div>
                                <div className="font-semibold">Duration</div>
                                <div className="text-gray-600">3-6 months</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center">
                                <Users size={24} />
                            </div>
                            <div>
                                <div className="font-semibold">Intake</div>
                                <div className="text-gray-600">Rolling basis</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <div className="font-semibold">Mode</div>
                                <div className="text-gray-600">On-site (Mombasa)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                What You'll <span className="text-gradient-blue">Gain</span>
                            </h2>
                            <ul className="space-y-4">
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-swahilipot-100 rounded-2xl aspect-video flex items-center justify-center">
                            <span className="text-swahilipot-400">Image placeholder</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Available <span className="text-gradient-blue">Departments</span>
                        </h2>
                        <p className="text-lg text-gray-600">Choose the department that matches your career goals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {departments.map((dept) => (
                            <div key={dept.name} className="bg-white rounded-xl p-6 shadow-sm border">
                                <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                                <p className="text-gray-600 text-sm">{dept.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Apply now and take the first step towards building your career.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100 text-lg px-8 py-3" asChild>
                        <Link href="/industrial-attachment/apply">
                            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
