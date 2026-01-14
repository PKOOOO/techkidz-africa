import { Users, Briefcase, GraduationCap, Building } from "lucide-react";

const stats = [
    {
        value: "10,000+",
        label: "Youth Reached",
        icon: Users,
    },
    {
        value: "500+",
        label: "Jobs Created",
        icon: Briefcase,
    },
    {
        value: "200+",
        label: "Graduates Trained",
        icon: GraduationCap,
    },
    {
        value: "50+",
        label: "Partners",
        icon: Building,
    },
];

export function Impact() {
    return (
        <section id="impact" className="section-padding bg-swahilipot-900">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Impact
                    </h2>
                    <p className="text-lg text-swahilipot-200 max-w-2xl mx-auto">
                        Making a difference in the lives of young people across East Africa.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-swahilipot-800 rounded-xl p-6 text-center"
                        >
                            <div className="bg-swahilipot-700 text-swahilipot-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <stat.icon size={24} />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-swahilipot-300 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
