import { Timeline } from "@/components/ui/timeline";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { EventCard3D } from "@/components/app/EventCard3D";

export const metadata = {
    title: "Events | Swahilipot Hub Foundation",
    description: "Discover upcoming events, workshops, and community gatherings at Swahilipot Hub.",
};

// Helper function to convert portable text blocks to plain text
function portableTextToPlainText(blocks: any[]): string {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks
        .map((block) => {
            if (block._type !== "block" || !block.children) {
                return "";
            }
            return block.children.map((child: any) => child.text || "").join("");
        })
        .join("\n\n");
}

// Helper function to get year from date
function getYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
}

// Helper function to group events by year
function groupEventsByYear(events: any[]) {
    const grouped: { [key: string]: any[] } = {};
    events.forEach((event) => {
        if (event.date) {
            const year = getYear(event.date);
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(event);
        }
    });
    return grouped;
}

async function getEvents() {
    const query = `*[_type == "event"] | order(date desc) {
        _id,
        title,
        date,
        endDate,
        location,
        description,
        image,
        isVirtual,
        registrationLink,
        isFeatured
    }`;
    
    return await client.fetch(query);
}

async function getEventsHeroImage() {
    const query = `*[_type == "eventsHeroImage" && isActive == true][0] {
        image
    }`;
    
    const result = await client.fetch(query);
    if (result?.image) {
        return urlFor(result.image).url();
    }
    return null;
}

export default async function EventsPage() {
    let events: any[] = [];
    let heroImageUrl: string | null = null;
    
    try {
        events = await getEvents();
        heroImageUrl = await getEventsHeroImage();
    } catch (error) {
        console.error("Error fetching events:", error);
    }

    // Group events by year
    const eventsByYear = groupEventsByYear(events);
    const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    // Format data for Timeline component
    const timelineData = years.map((year) => {
        const yearEvents = eventsByYear[year].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return {
            title: year,
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        {yearEvents.length} {yearEvents.length === 1 ? "event" : "events"} in {year}
                    </p>
                    <div className="space-y-6 mb-8">
                        {yearEvents.map((event) => {
                            // Pre-process event data for client component
                            const processedEvent = {
                                _id: event._id,
                                title: event.title,
                                date: event.date,
                                endDate: event.endDate,
                                location: event.location,
                                description: event.description ? portableTextToPlainText(event.description) : undefined,
                                imageUrl: event.image ? urlFor(event.image).url() : undefined,
                                isVirtual: event.isVirtual,
                                registrationLink: event.registrationLink,
                                isFeatured: event.isFeatured,
                            };
                            
                            return (
                                <EventCard3D
                                    key={event._id}
                                    event={processedEvent}
                                />
                            );
                        })}
                    </div>
                </div>
            ),
        };
    });

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[300px] md:h-[400px] z-0">
                {/* Background Image */}
                {heroImageUrl && (
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <div
                            className="h-[300px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${heroImageUrl})`,
                                opacity: 0.8,
                            }}
                        />
                    </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#6A1383]/5 z-0 h-[300px] md:h-[400px]" />
                
                {/* Bottom blur gradient */}
                <div className="absolute bottom-0 z-30 inset-x-0 h-24 md:h-32 w-full pointer-events-none">
                    <div className="absolute inset-0 backdrop-blur-lg" style={{ maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(255,255,255) 0%, rgb(255,255,255) 5%, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 90%, transparent 100%)', maskImage: 'linear-gradient(to top, black 0%, transparent 70%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 70%)' }} />
                    
                    {/* Text in middle of blur area */}
                    <div className="absolute inset-0 flex items-end justify-center pb-2 md:pb-4 z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                            Upcoming Events
                        </h2>
                    </div>
                </div>
                
                {/* Content */}
                
            </section>

            {/* Timeline Section */}
            <section className="pt-8 md:pt-12 pb-16">
                <div className="container-custom">
                    {timelineData.length > 0 ? (
                        <div className="relative w-full overflow-clip">
                            <Timeline 
                                data={timelineData}
                                showHeader={false}
                            />
                                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 mb-4">No events found.</p>
                            <p className="text-sm text-gray-400">
                        Events are managed through Sanity Studio
                    </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
