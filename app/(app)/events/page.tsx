import type { Metadata } from "next";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Timeline } from "@/components/ui/timeline";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SanityEvent = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: PortableTextBlock[];
  image?: { asset?: { _ref: string } };
  isVirtual?: boolean;
  registrationLink?: string;
  isFeatured?: boolean;
};

export const metadata: Metadata = {
  title: "Events | TechKidz Africa",
  description:
    "Stay updated on upcoming events, workshops, hackathons and community activities at TechKidz Africa in Mombasa, Kenya.",
  alternates: {
    canonical: "https://techkidzafrica.co.ke/events",
  },
  openGraph: {
    title: "Events | TechKidz Africa",
    description:
      "Stay updated on upcoming events, workshops, hackathons and community activities at TechKidz Africa in Mombasa, Kenya.",
    url: "https://techkidzafrica.co.ke/events",
    siteName: "TechKidz Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | TechKidz Africa",
    description:
      "Stay updated on upcoming events, workshops, hackathons and community activities at TechKidz Africa in Mombasa, Kenya.",
  },
};

const formatEventDate = (start: string, end?: string) => {
  const startDate = new Date(start);
  const startLabel = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!end) return startLabel;
  const endDate = new Date(end);
  const endLabel = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${startLabel} — ${endLabel}`;
};

function groupEventsByYear(events: SanityEvent[]) {
  const grouped: Record<string, SanityEvent[]> = {};
  events.forEach((event) => {
    if (!event.date) return;
    const year = new Date(event.date).getFullYear().toString();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(event);
  });
  return grouped;
}

async function getEvents(): Promise<SanityEvent[]> {
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
  return client.fetch(query);
}

async function getEventsHeroImage() {
  const query = `*[_type == "eventsHeroImage" && isActive == true][0] { image }`;
  const result = await client.fetch(query);
  return result?.image ? urlFor(result.image).url() : null;
}

export default async function EventsPage() {
  let events: SanityEvent[] = [];
  let heroImageUrl: string | null = null;

  try {
    events = await getEvents();
    heroImageUrl = await getEventsHeroImage();
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  const eventsByYear = groupEventsByYear(events);
  const years = Object.keys(eventsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const timelineData = years.map((year) => {
    const yearEvents = eventsByYear[year].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return {
      title: year,
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            {yearEvents.length} {yearEvents.length === 1 ? "event" : "events"}{" "}
            in {year}
          </p>
          <div className="space-y-10 mb-8">
            {yearEvents.map((event) => {
              const imageUrl = event.image ? urlFor(event.image).url() : null;
              return (
                <article
                  key={event._id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 md:p-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]"
                >
                  {imageUrl ? (
                    <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={imageUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                    <span>{formatEventDate(event.date, event.endDate)}</span>
                    {event.location ? (
                      <span className="before:content-['•'] before:mx-2">
                        {event.location}
                      </span>
                    ) : null}
                    {event.isVirtual ? (
                      <span className="before:content-['•'] before:mx-2">
                        Virtual
                      </span>
                    ) : null}
                  </div>

                  {event.description ? (
                    <div className="prose prose-sm md:prose-base max-w-none mt-4 text-neutral-700 dark:text-neutral-300">
                      <PortableText value={event.description} />
                    </div>
                  ) : null}

                  {event.registrationLink ? (
                    <div className="mt-5">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-swahilipot-600 text-white hover:bg-swahilipot-700 transition-colors"
                      >
                        Register
                      </a>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <section className="relative overflow-hidden h-[300px] md:h-[400px] z-0">
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

        <div className="absolute inset-0 bg-[#6A1383]/5 z-0 h-[300px] md:h-[400px]" />

        <div className="absolute bottom-0 z-30 inset-x-0 h-24 md:h-32 w-full pointer-events-none">
          <div
            className="absolute inset-0 backdrop-blur-lg"
            style={{
              maskImage:
                "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgb(255,255,255) 0%, rgb(255,255,255) 5%, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 90%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, transparent 70%)",
            }}
          />
        </div>
      </section>

      <div className="relative -mt-4 md:-mt-6 flex justify-center z-20">
        <h2 className="text-3xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
          Upcoming Events
        </h2>
      </div>

      <section className="pt-8 md:pt-12 pb-16">
        <div className="container-custom">
          {timelineData.length > 0 ? (
            <div className="relative w-full overflow-clip">
              <Timeline data={timelineData} showHeader={false} />
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
