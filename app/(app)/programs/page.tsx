import Link from "next/link";
import { ArrowRight, Laptop, Palette, Megaphone, Users, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Programs | Swahilipot Hub Foundation",
    description: "Explore our youth empowerment programs in technology, arts, and entrepreneurship.",
};

const programs = [
    {
        title: "Case Management",
        description: "Personalized support and guidance for youth development. We provide one-on-one mentorship, career counseling, and life skills training to help young people navigate their personal and professional journeys.",
        href: "/programs/case-management",
        icon: Users,
    },
    {
        title: "Tourism Innovation Lab",
        description: "Transforming tourism through technology and innovation. Young innovators work on digital solutions to enhance visitor experiences and promote sustainable tourism in the coastal region.",
        href: "/programs/tourism-innovation-lab",
        icon: Laptop,
    },
    {
        title: "Swahili Tech Women",
        description: "Empowering women in technology and STEM fields. This initiative provides training, mentorship, and networking opportunities to help women break into and thrive in tech careers.",
        href: "/programs/swahili-tech-women",
        icon: Palette,
    },
    {
        title: "Employer Engagement",
        description: "Connecting youth with employment opportunities. We partner with businesses to create internships, apprenticeships, and entry-level positions for program graduates.",
        href: "/programs/employer-engagement",
        icon: Briefcase,
    },
    {
        title: "Campus Ambassador",
        description: "University outreach program extending our reach to campuses across the region. Ambassadors help spread our mission and identify talented students for our programs.",
        href: "/programs/campus-ambassador",
        icon: GraduationCap,
    },
    {
        title: "Industrial Attachment",
        description: "Practical work experience for students. We host students from universities and TVETs for industrial attachment, providing hands-on experience in their fields of study.",
        href: "/industrial-attachment",
        icon: Megaphone,
    },
];

export default function ProgramsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our <span className="text-gradient-blue">Programs</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Discover initiatives designed to empower youth through technology,
                            creativity, and entrepreneurship.
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((program) => (
                            <div
                                key={program.href}
                                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="bg-swahilipot-100 text-swahilipot-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                        <program.icon size={28} />
                                    </div>
                                    <h2 className="text-xl font-semibold mb-3">{program.title}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                                    <Button variant="outline" className="group" asChild>
                                        <Link href={program.href}>
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Join our programs and take the first step towards building your future.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/industrial-attachment">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
