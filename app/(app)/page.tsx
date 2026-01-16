import { Hero, About, Programs, Impact, Team, Contact } from "@/components/swahilipot";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

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

export default async function HomePage() {
  let heroImages: string[] = [];
  
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

  return (
    <>
      <Hero images={heroImages} />
      <About />
      <Programs />
      <Impact />
      <Team />
      <Contact />
    </>
  );
}
