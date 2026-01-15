import { Hero, About, Programs, Impact, Team, Contact } from "@/components/swahilipot";

export default function HomePage() {
  // Hero images from the public folder
  const heroImages = [
    "/hero1.jpg",
    "/hero2.jpg",
  ];

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
