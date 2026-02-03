import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProjectTracingBeam } from "@/components/app/ProjectTracingBeam";

type Section = {
  _key: string;
  badge?: string;
  title: string;
  content?: unknown[];
  image?: unknown;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  heroImage?: unknown;
  sections?: Section[];
};

async function getProject(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        description,
        heroImage,
        sections[] {
            _key,
            badge,
            title,
            content,
            image
        }
    }`;

  return client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Tech Kidz Africa`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const heroImageUrl = project.heroImage
    ? urlFor(project.heroImage).url()
    : null;

  // Process sections to include image URLs
  const sectionsWithImages =
    project.sections?.map((section) => ({
      ...section,
      imageUrl: section.image ? urlFor(section.image).width(1000).url() : null,
    })) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-visible h-[300px] md:h-[400px] z-20">
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

          {/* Text in middle of blur area */}
          <div className="absolute inset-x-0 bottom-[-15px] flex items-end justify-center z-10">
            <h1 className="text-3xl md:text-3xl font-bold text-gradient-blue drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content with TracingBeam */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <Link
              href="/projects"
              className="text-sm text-gray-500 hover:text-swahilipot-600"
            >
              ← Back to Projects
            </Link>
          </div>

          {sectionsWithImages.length > 0 ? (
            <ProjectTracingBeam sections={sectionsWithImages} />
          ) : (
            <p className="text-center text-gray-500">
              No content sections yet. Add them in Sanity Studio.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
