import Image from "next/image";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

export const metadata = {
    title: "About Us | Swahilipot Hub Foundation",
    description: "Learn about Swahilipot Hub Foundation's mission to empower youth through technology, arts, and entrepreneurship.",
};

const values = [
    {
        title: "Community First",
        description: "We believe in the power of community to drive positive change.",
        icon: Users,
    },
    {
        title: "Innovation",
        description: "We embrace technology and creative thinking to solve challenges.",
        icon: Lightbulb,
    },
    {
        title: "Empowerment",
        description: "We equip young people with skills and opportunities to succeed.",
        icon: Target,
    },
    {
        title: "Inclusivity",
        description: "We welcome and support all young people regardless of background.",
        icon: Heart,
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About <span className="text-gradient-blue">Swahilipot Hub</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Swahilipot Hub Foundation is a youth-focused organization dedicated to
                            nurturing talent, fostering innovation, and creating opportunities for
                            young people in Mombasa and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-swahilipot-600 text-white rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-swahilipot-100">
                                To empower youth through technology, arts, and entrepreneurship
                                by providing access to resources, mentorship, and opportunities
                                that transform lives and communities.
                            </p>
                        </div>
                        <div className="bg-swahilipot-900 text-white rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                            <p className="text-swahilipot-200">
                                A future where every young person in East Africa has the skills,
                                resources, and opportunities to realize their full potential and
                                contribute meaningfully to society.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our <span className="text-gradient-blue">Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="bg-white rounded-xl p-6 shadow-sm border"
                            >
                                <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <value.icon size={24} />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our <span className="text-gradient-blue">Story</span>
                        </h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Founded in Mombasa, Kenya, Swahilipot Hub began as a small community
                            initiative to address youth unemployment and lack of opportunities.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Today, we have grown into a vibrant hub serving thousands of young
                            people through our programs in technology, creative arts, and
                            entrepreneurship.
                        </p>
                        <p className="text-lg text-gray-700">
                            Our work is guided by the belief that young people, when given the
                            right tools and support, can be powerful agents of change in their
                            communities.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
