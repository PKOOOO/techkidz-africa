import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

const programs = [
    { name: "Case Management", href: "/programs/case-management" },
    { name: "Tourism Innovation Lab", href: "/programs/tourism-innovation-lab" },
    { name: "Swahili Tech Women", href: "/programs/swahili-tech-women" },
    { name: "Employer Engagement", href: "/programs/employer-engagement" },
];

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/swahilipothub" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/swahilipothub" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/swahilipothub" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/swahilipothub" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@swahilipothub" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-swahilipot-950 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/sph-logo-white.png"
                                alt="Swahilipot Hub"
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
                            {programs.map((link) => (
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

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <address className="text-swahilipot-300 text-sm not-italic space-y-2">
                            <p>Fort Jesus Road, Old Town</p>
                            <p>Mombasa, Kenya</p>
                            <p>
                                <a href="mailto:info@swahilipothub.co.ke" className="hover:text-white transition-colors">
                                    info@swahilipothub.co.ke
                                </a>
                            </p>
                            <p>
                                <a href="tel:+254700000000" className="hover:text-white transition-colors">
                                    +254 700 000 000
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-swahilipot-800 mt-8 pt-8 text-center text-swahilipot-400 text-sm">
                    <p>&copy; {currentYear} Swahilipot Hub Foundation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
