import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";

import CareerApplicationForm from "@/components/app/CareerApplicationForm";

type Career = {
    _id: string;
    title: string;
    type?: string | null;
    location?: string | null;
    deadline?: string | null;
    description?: unknown[];
    requirements?: string[] | null;
    responsibilities?: string[] | null;
    openTo?: string[] | null;
    growthOpportunities?: string[] | null;
};

const formatType = (value?: string | null) => {
    if (!value) return null;
    return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const getCareer = async (slug: string): Promise<Career | null> => {
    const query = `*[_type == "career" && slug.current == $slug && (!defined(isActive) || isActive == true)][0] {
        _id,
        title,
        type,
        location,
        deadline,
        description,
        requirements,
        responsibilities,
        openTo,
        growthOpportunities
    }`;

    return client.fetch(query, { slug });
};

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const career = await getCareer(slug);

    if (!career) {
        notFound();
    }

    const typeLabel = formatType(career.type);

    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link href="/careers" className="text-sm text-gray-500 hover:text-swahilipot-600">
                            Careers
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">{career.title}</h1>
                        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                            {typeLabel ? <span className="px-3 py-1 bg-white rounded-full">{typeLabel}</span> : null}
                            {career.location ? (
                                <span className="px-3 py-1 bg-white rounded-full">{career.location}</span>
                            ) : null}
                            {career.deadline ? (
                                <span className="px-3 py-1 bg-white rounded-full">
                                    Apply by {career.deadline}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom flex flex-col items-center gap-12">
                    <div className="space-y-10 w-full max-w-3xl">
                        {career.type !== "attachment" && career.description ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">About the role</h2>
                                <div className="prose max-w-[60ch] text-gray-800 text-base md:text-lg leading-relaxed text-justify">
                                    <PortableText value={career.description as Parameters<typeof PortableText>[0]["value"]} />
                                </div>
                            </div>
                        ) : null}

                        {career.type === "attachment" ? (
                            <>
                                {career.openTo?.length ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Open To</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg leading-relaxed max-w-[60ch]">
                                            {career.openTo.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}

                                {career.growthOpportunities?.length ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg leading-relaxed max-w-[60ch]">
                                            {career.growthOpportunities.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <>
                                {career.responsibilities?.length ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">What you&apos;ll do</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg leading-relaxed max-w-[60ch]">
                                            {career.responsibilities.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}

                                {career.requirements?.length ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-800 text-base md:text-lg leading-relaxed max-w-[60ch]">
                                            {career.requirements.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </>
                        )}

                        <div className="border-t pt-8">
                            <h3 className="text-xl font-semibold mb-2">Applying</h3>
                            <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify max-w-[60ch]">
                                If there appears to be a fit, we&apos;ll reach out to schedule 2-3 short technicals.
                                After, we&apos;ll schedule an onsite in our office, where you&apos;ll work on a small
                                project, discuss ideas, and meet the team.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 h-fit w-full max-w-3xl">
                        <h3 className="text-xl font-semibold mb-6">Apply for this role</h3>
                        <CareerApplicationForm careerId={career._id} careerTitle={career.title} />
                    </div>
                </div>
            </section>
        </>
    );
}
