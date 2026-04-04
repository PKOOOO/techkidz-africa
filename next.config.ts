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
      {
        source: "/all_events_view",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/Faq",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/all_blogs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contactus_page",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/programs_page",
        destination: "/programs",
        permanent: true,
      },
      // Wildcard catch-all — must be last
      {
        source: "/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
