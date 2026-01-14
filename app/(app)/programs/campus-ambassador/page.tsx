import Link from "next/link";
import { ArrowLeft, GraduationCap, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Campus Ambassador | Swahilipot Hub Foundation",
    description: "Join our university outreach program and be a voice for youth empowerment.",
};

const responsibilities = [
    "Represent Swahilipot Hub on your campus",
    "Organize awareness events and workshops",
    "Recruit students for our programs",
    "Share opportunities with peers",
    "Build leadership skills",
    "Connect with industry professionals",
];

export default function CampusAmbassadorPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/programs" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <GraduationCap size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Campus <span className="text-gradient-blue">Ambassador</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Our Campus Ambassador program extends our reach to universities across the region, empowering student leaders to spread our mission.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Your Role</h2>
                            <ul className="space-y-4">
                                {responsibilities.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Star className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Certificate of recognition</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Star className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Exclusive networking events</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Star className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">Priority access to programs and internships</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Become an Ambassador</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Are you a university student passionate about youth empowerment? Apply today!
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/contact">Apply Now</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
