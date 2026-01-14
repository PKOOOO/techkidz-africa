import Link from "next/link";
import { ArrowRight, Laptop, Palette, Megaphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
    {
        title: "Case Management",
        description: "Personalized support and guidance for youth development",
        href: "/programs/case-management",
        icon: Users,
    },
    {
        title: "Tourism Innovation Lab",
        description: "Transforming tourism through technology and innovation",
        href: "/programs/tourism-innovation-lab",
        icon: Laptop,
    },
    {
        title: "Swahili Tech Women",
        description: "Empowering women in technology and STEM fields",
        href: "/programs/swahili-tech-women",
        icon: Palette,
    },
    {
        title: "Employer Engagement",
        description: "Connecting youth with employment opportunities",
        href: "/programs/employer-engagement",
        icon: Megaphone,
    },
];

export function Programs() {
    return (
        <section id="programs" className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our <span className="text-gradient-blue">Programs</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our initiatives designed to empower youth through technology,
                        creativity, and entrepreneurship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {programs.map((program) => (
                        <Link
                            key={program.href}
                            href={program.href}
                            className="group bg-white rounded-xl p-6 shadow-sm border hover:shadow-md hover:border-swahilipot-200 transition-all"
                        >
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-swahilipot-600 group-hover:text-white transition-colors">
                                <program.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-swahilipot-600 transition-colors">
                                {program.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{program.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Button className="bg-swahilipot-600 hover:bg-swahilipot-700 text-white" asChild>
                        <Link href="/programs">
                            View All Programs <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
