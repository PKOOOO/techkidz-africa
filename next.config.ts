import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Disable optimization to bypass private IP resolution check
    // Images will load directly from Sanity CDN
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/team_page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Enrolment_page",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/about.php",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/programs.php",
        destination: "/programs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
