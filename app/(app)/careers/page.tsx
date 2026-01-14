import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Careers | Swahilipot Hub Foundation",
    description: "Join our team and help empower youth across East Africa.",
};

// Placeholder jobs - will be replaced with Sanity data
const jobs = [
    {
        title: "Program Coordinator",
        department: "Programs",
        type: "Full-time",
        location: "Mombasa, Kenya",
        slug: "program-coordinator",
    },
    {
        title: "Software Developer",
        department: "Tech & Engineering",
        type: "Full-time",
        location: "Mombasa, Kenya",
        slug: "software-developer",
    },
    {
        title: "Marketing Intern",
        department: "Communication",
        type: "Internship",
        location: "Mombasa, Kenya",
        slug: "marketing-intern",
    },
];

export default function CareersPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Join Our <span className="text-gradient-blue">Team</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Be part of a passionate team dedicated to empowering youth across East Africa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>

                    <div className="grid gap-4 max-w-3xl mx-auto">
                        {jobs.map((job) => (
                            <Link
                                key={job.slug}
                                href={`/careers/${job.slug}`}
                                className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md hover:border-swahilipot-200 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold group-hover:text-swahilipot-600 transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">{job.department}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{job.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-400 group-hover:text-swahilipot-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {jobs.length === 0 && (
                        <p className="text-center text-gray-500">
                            No open positions at the moment. Check back soon!
                        </p>
                    )}

                    <p className="text-center text-gray-500 mt-8">
                        Job postings are managed through Sanity Studio
                    </p>
                </div>
            </section>

            {/* Industrial Attachment CTA */}
            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Looking for an Internship?
                    </h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Apply for our Industrial Attachment program and gain hands-on experience.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/industrial-attachment">
                            Apply for Attachment <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
