"use client";

import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

interface EventCard3DProps {
    event: {
        _id: string;
        title: string;
        date: string;
        endDate?: string;
        location?: string;
        description?: string;
        imageUrl?: string;
        isVirtual?: boolean;
        registrationLink?: string;
        isFeatured?: boolean;
    };
}

// Helper function to format date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Helper function to format date with short month (for mobile)
function formatDateShort(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function EventCard3D({ event }: EventCard3DProps) {
    return (
        <CardContainer
            className="w-full"
            containerClassName="py-0"
        >
            <CardBody className="!h-auto !w-full bg-white dark:bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] border-black/[0.1] dark:border-white/[0.2] rounded-lg border shadow-sm p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {event.imageUrl && (
                        <CardItem
                            translateZ="50"
                            className="md:w-48 shrink-0"
                        >
                            <Image
                                src={event.imageUrl}
                                alt={event.title || "Event image"}
                                width={500}
                                height={300}
                                className="w-full h-48 sm:h-56 md:h-full md:min-h-[200px] object-cover rounded-lg group-hover/card:shadow-xl"
                            />
                        </CardItem>
                    )}
                    <div className="flex-1 min-w-0">
                        <CardItem
                            translateZ="20"
                            className="flex items-center gap-2 mb-2 flex-wrap"
                        >
                            {event.isVirtual && (
                                <span className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded">
                                    Virtual
                                </span>
                            )}
                            {event.isFeatured && (
                                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
                                    Featured
                                </span>
                            )}
                        </CardItem>
                        <CardItem
                            translateZ="30"
                            as="h3"
                            className="text-lg md:text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100"
                        >
                            {event.title}
                        </CardItem>
                        {event.description && (
                            <CardItem
                                translateZ="40"
                                as="p"
                                className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 line-clamp-5 md:line-clamp-3"
                            >
                                {event.description}
                            </CardItem>
                        )}
                        <CardItem
                            translateZ="20"
                            className="flex flex-col sm:flex-row gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span className="md:hidden">{formatDateShort(event.date)}</span>
                                <span className="hidden md:inline">{formatDate(event.date)}</span>
                                {event.endDate && (
                                    <>
                                        <span className="md:hidden"> - {formatDateShort(event.endDate)}</span>
                                        <span className="hidden md:inline"> - {formatDate(event.endDate)}</span>
                                    </>
                                )}
                            </div>
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </CardItem>
                        {event.registrationLink && (
                            <CardItem
                                translateZ="20"
                                as="div"
                            >
                                <Button
                                    className="bg-[#6A1383] hover:bg-[#5a0f70] text-white"
                                    asChild
                                >
                                    <a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Register <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardItem>
                        )}
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
}
