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
      {
        source: "/faq_page",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/public/about_main_page",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about_main_page",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/news_page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/show_all_news",
        destination: "/",
        permanent: true,
      },
      {
        source: "/main_news_view/:id",
        destination: "/",
        permanent: true,
      },
      {
        source: "/post_details/:id",
        destination: "/",
        permanent: true,
      },
      {
        source: "/single_program/:id",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/single_event/:id",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/view_program",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/donate",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
