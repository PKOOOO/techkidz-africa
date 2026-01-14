import Link from "next/link";
import { ArrowLeft, Briefcase, CheckCircle, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Employer Engagement | Swahilipot Hub Foundation",
    description: "Connecting youth with employment opportunities and building pathways to careers.",
};

const benefits = [
    "Job placement assistance",
    "Resume and interview preparation",
    "Industry connections and networking",
    "Internship opportunities",
    "Skills matching to employer needs",
    "Career fairs and hiring events",
];

export default function EmployerEngagementPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/programs" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Briefcase size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Employer <span className="text-gradient-blue">Engagement</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            We partner with businesses to create employment opportunities for youth, bridging the gap between talent and employers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">For Job Seekers</h2>
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
                            <h2 className="text-2xl font-bold mb-6">For Employers</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Building className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Access to pre-screened, skilled candidates</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Building className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Support with onboarding and training</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Building className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Customized recruitment solutions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Whether you're seeking employment or looking to hire, we're here to help.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
