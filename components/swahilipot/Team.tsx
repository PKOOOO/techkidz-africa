import Image from "next/image";

const teamMembers = [
    {
        name: "Team Member 1",
        role: "Executive Director",
        image: "/images/team/placeholder.jpg",
    },
    {
        name: "Team Member 2",
        role: "Program Manager",
        image: "/images/team/placeholder.jpg",
    },
    {
        name: "Team Member 3",
        role: "Tech Lead",
        image: "/images/team/placeholder.jpg",
    },
    {
        name: "Team Member 4",
        role: "Community Manager",
        image: "/images/team/placeholder.jpg",
    },
];

export function Team() {
    return (
        <section id="team" className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our <span className="text-gradient-blue">Team</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet the dedicated individuals driving change at Swahilipot Hub.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="text-center group"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-swahilipot-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-swahilipot-400 text-4xl font-bold">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg group-hover:text-swahilipot-600 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-gray-600 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 mt-8">
                    Team members are managed through Sanity Studio
                </p>
            </div>
        </section>
    );
}
