import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { client } from "@/sanity/lib/client";

const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/techkidzafrica" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/techkidzafrica" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/techkidzafrica" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/techkidzafrica" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@techkidzafrica" },
];

async function getPrograms() {
    const query = `*[_type == "programsPage" && isActive == true] | order(order asc) {
        _id,
        title,
        href
    }`;
    
    try {
        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching programs for footer:", error);
        return [];
    }
}

export async function Footer() {
    const currentYear = new Date().getFullYear();
    const programs = await getPrograms();

    return (
        <footer className="bg-swahilipot-950 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo.svg"
                                alt="Tech Kidz Africa"
                                width={180}
                                height={50}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-swahilipot-300 text-sm mb-4">
                            Empowering youth through technology, arts, and entrepreneurship.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-swahilipot-900 hover:bg-swahilipot-700 w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-swahilipot-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Programs</h3>
                        <ul className="space-y-2">
                            {programs.length > 0 ? (
                                programs.map((program) => (
                                    <li key={program._id || program.href}>
                                        <Link
                                            href={program.href}
                                            className="text-swahilipot-300 hover:text-white transition-colors text-sm"
                                        >
                                            {program.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-swahilipot-400 text-sm">No programs available</li>
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact us</h3>
                        <div className="text-swahilipot-300 text-sm space-y-2">
                            <p>
                                <a href="tel:+254780754126" className="hover:text-white transition-colors">
                                    (+254) 780 754126
                                </a>
                            </p>
                            <div>
                                <p className="mb-1">Email Us</p>
                                <p>
                                    <a href="mailto:info@techkidzafrica.co.ke" className="hover:text-white transition-colors">
                                        info@techkidzafrica.co.ke
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p className="mb-1">Headquarters</p>
                                <p>Ratna Square, Mombasa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-swahilipot-800 mt-8 pt-8 text-center text-swahilipot-400 text-sm">
                    <p>&copy; {currentYear} Tech Kidz Africa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
