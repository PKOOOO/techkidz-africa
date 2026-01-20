"use client";

import Carousel from "@/components/ui/carousel2";

type TeamMember = {
    _id: string;
    name: string;
    role: string;
    bio?: string;
    imageUrl?: string;
    linkedin?: string;
    twitter?: string;
};

type TeamProps = {
    members: TeamMember[];
};

export function Team({ members }: TeamProps) {
    const slides = members.map((member) => ({
        title: member.name,
        src: member.imageUrl || "/images/team/placeholder.jpg",
        role: member.role,
        vision: member.bio,
    }));

    return (
        <section id="team" className="pt-0 pb-16 md:pb-24 bg-neutral-50 dark:bg-neutral-950 overflow-clip">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our <span className="text-gradient-blue">Team</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Meet the leaders behind the impact. Tap to explore their vision.
                    </p>
                </div>
            </div>

            {members.length > 0 ? (
                <div className="container-custom pt-4 pb-4">
                    <div className="flex justify-center overflow-x-hidden">
                        <Carousel slides={slides} />
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500">
                        Team members are managed through Sanity Studio
                    </p>
                </div>
            )}
        </section>
    );
}
