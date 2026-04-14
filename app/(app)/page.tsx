import type { Metadata } from "next";
import { Hero, About, Programs, Impact, TeamWrapper, Contact } from "@/components/swahilipot";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "TechKidz Africa | Edtech Academy & Innovation Hub in Mombasa",
  description:
    "Tech Kidz Africa is an edtech Academy, innovation hub and social enterprise that nurtures the spirit of innovativeness through empowering learners.",
  alternates: {
    canonical: "https://techkidzafrica.co.ke",
  },
  openGraph: {
    title: "TechKidz Africa | Edtech Academy & Innovation Hub in Mombasa",
    description:
      "Tech Kidz Africa is an edtech Academy, innovation hub and social enterprise that nurtures the spirit of innovativeness through empowering learners.",
    url: "https://techkidzafrica.co.ke",
    siteName: "TechKidz Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechKidz Africa | Edtech Academy & Innovation Hub in Mombasa",
    description:
      "Tech Kidz Africa is an edtech Academy, innovation hub and social enterprise that nurtures the spirit of innovativeness through empowering learners.",
  },
};

async function getHeroImages() {
  const query = `*[_type == "heroImage" && isActive == true && defined(image)] | order(order asc) {
    image
  }`;

  const images = await client.fetch(query);

  // Convert Sanity image references to URLs (preserving original aspect ratio)
  return images
    .map((item: { image?: any }) => {
      if (!item.image) return null;
      try {
        return urlFor(item.image).url();
      } catch (error) {
        console.error("Error generating image URL:", error);
        return null;
      }
    })
    .filter((url: string | null): url is string => Boolean(url));
}

async function getImpactStats() {
  const query = `*[_type == "impactStat" && isActive == true] | order(order asc) {
    _id,
    value,
    label,
    iconName,
    description,
    order
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching impact stats:", error);
    return [];
  }
}

export default async function HomePage() {
  let heroImages: string[] = [];
  let impactStats: any[] = [];

  try {
    heroImages = await getHeroImages();
  } catch (error) {
    console.error("Error fetching hero images:", error);
    // Fallback to default images if Sanity fetch fails
    heroImages = ["/hero1.jpg", "/hero2.jpg"];
  }

  // If no images from Sanity, use fallback
  if (heroImages.length === 0) {
    heroImages = ["/hero1.jpg", "/hero2.jpg"];
  }

  // Fetch impact stats
  try {
    impactStats = await getImpactStats();
  } catch (error) {
    console.error("Error fetching impact stats:", error);
    impactStats = [];
  }

  return (
    <>
      <Hero images={heroImages} />
      <About />
      <Programs />
      <Impact stats={impactStats} />
      <TeamWrapper />
      <Contact />
    </>
  );
}
