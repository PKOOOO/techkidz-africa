import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techkidzafrica.co.ke"),
  title: {
    default: "Tech Kidz Africa | Technology Academy for Children & Youth in Kenya",
    template: "%s | Tech Kidz Africa",
  },
  description:
    "Tech Kidz Africa is a leading technology academy and innovation hub in Mombasa, Kenya. We empower children and youth (ages 4-19) through robotics, coding, graphic design, and creative technology programs.",
  keywords: [
    "Tech Kidz Africa",
    "TechKidz Africa",
    "technology academy Kenya",
    "coding for kids Mombasa",
    "robotics for children Kenya",
    "STEM education Kenya",
    "kids coding classes",
    "youth technology programs",
    "innovation hub Mombasa",
    "edtech Africa",
  ],
  openGraph: {
    siteName: "TechKidz Africa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/tka_logo.png",
        width: 226,
        height: 225,
        alt: "TechKidz Africa Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@techkidzafrica",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
