import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Events | Swahilipot Hub Foundation",
    description: "Discover upcoming events, workshops, and community gatherings at Swahilipot Hub.",
};

// Placeholder events - will be replaced with Sanity data
const events = [
    {
        title: "Tech Career Fair 2026",
        date: "February 15, 2026",
        location: "Swahilipot Hub, Mombasa",
        description: "Connect with leading employers and explore career opportunities in tech.",
        isVirtual: false,
    },
    {
        title: "Women in Tech Workshop",
        date: "February 22, 2026",
        location: "Virtual Event",
        description: "A hands-on workshop for women looking to start their journey in technology.",
        isVirtual: true,
    },
    {
        title: "Startup Pitch Night",
        date: "March 5, 2026",
        location: "Swahilipot Hub, Mombasa",
        description: "Young entrepreneurs pitch their ideas to investors and mentors.",
        isVirtual: false,
    },
];

export default function EventsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Upcoming <span className="text-gradient-blue">Events</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Join us for workshops, meetups, and community gatherings.
                        </p>
                    </div>
                </div>
            </section>

            {/* Events List */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid gap-6 max-w-3xl mx-auto">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl border shadow-sm p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {event.isVirtual && (
                                                <span className="bg-swahilipot-100 text-swahilipot-700 text-xs font-medium px-2 py-1 rounded">
                                                    Virtual
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                        <p className="text-gray-600 mb-4">{event.description}</p>
                                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="bg-swahilipot-600 hover:bg-swahilipot-700 text-white">
                                        Register <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 mt-8">
                        Events are managed through Sanity Studio
                    </p>
                </div>
            </section>
        </>
    );
}
