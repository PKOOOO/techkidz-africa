import { Impact } from "@/components/swahilipot";
import { TrendingUp, Users, Award, Globe } from "lucide-react";

export const metadata = {
    title: "Our Impact | Swahilipot Hub Foundation",
    description: "See how Swahilipot Hub is making a difference in the lives of young people across East Africa.",
};

const impactDetails = [
    {
        title: "Youth Reached",
        value: "10,000+",
        description: "Young people have participated in our programs and events since inception.",
        icon: Users,
    },
    {
        title: "Jobs Created",
        value: "500+",
        description: "Employment opportunities facilitated through our employer engagement programs.",
        icon: TrendingUp,
    },
    {
        title: "Skills Training",
        value: "200+",
        description: "Youth have completed our skills development and training programs.",
        icon: Award,
    },
    {
        title: "Global Partners",
        value: "50+",
        description: "Organizations from around the world partnering with us on youth development.",
        icon: Globe,
    },
];

export default function ImpactPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our <span className="text-gradient-blue">Impact</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Measuring our success through the lives we've touched and communities we've transformed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <Impact />

            {/* Detailed Impact */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {impactDetails.map((item) => (
                            <div
                                key={item.title}
                                className="bg-white rounded-xl border shadow-sm p-8"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-swahilipot-100 text-swahilipot-600 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-swahilipot-600 mb-1">
                                            {item.value}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Success <span className="text-gradient-blue">Stories</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Real stories of transformation from our community members.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-swahilipot-100 mx-auto mb-4" />
                                <p className="text-gray-600 text-center mb-4 italic">
                                    "Swahilipot Hub changed my life. The skills I gained helped me land my dream job."
                                </p>
                                <p className="text-center font-semibold">Success Story {i}</p>
                                <p className="text-center text-sm text-gray-500">Program Graduate</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
