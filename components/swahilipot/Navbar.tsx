"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Program = {
    _id: string;
    title: string;
    href: string;
};

type NavbarProps = {
    programs?: Program[];
};

const departments = [
    { name: "Communication", href: "/department/communication", description: "Strategic messaging and media" },
    { name: "Tech & Engineering", href: "/department/tech-engineering", description: "Innovative tech solutions" },
    { name: "Creatives", href: "/department/creatives", description: "Arts and creative expression" },
    { name: "Community & Entrepreneurship", href: "/department/community-entrepreneurship", description: "Business development and community support" },
];

export function Navbar({ programs = [] }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Add "All Programs" as the first item
    const allPrograms = [
        { _id: "all", title: "All Programs", href: "/programs" },
        ...programs.map((p) => ({
            _id: p._id,
            title: p.title,
            href: p.href,
        })),
    ];

    return (
        <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b shadow-sm">
            <div className="container-custom flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.svg"
                            alt="Swahilipot Hub Logo"
                            width={180}
                            height={50}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                    <Link href="/" className="px-2 py-1 text-foreground hover:text-swahilipot-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="px-2 py-1 text-foreground hover:text-swahilipot-600 transition-colors">
                        About
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent h-auto px-2 py-1 hover:bg-transparent hover:text-swahilipot-600 data-[state=open]:bg-transparent">
                                    Programs
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid grid-cols-2 w-[500px] gap-3 p-4">
                                        {allPrograms.map((item) => (
                                            <Link
                                                key={item._id || item.href}
                                                href={item.href}
                                                className="block p-3 rounded-md hover:bg-gray-100"
                                            >
                                                <div className="font-medium">{item.title}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent h-auto px-2 py-1 hover:bg-transparent hover:text-swahilipot-600 data-[state=open]:bg-transparent">
                                    Departments
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid grid-cols-2 w-[500px] gap-3 p-4">
                                        {departments.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="block p-3 space-y-1 rounded-md hover:bg-gray-100"
                                            >
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-600">{item.description}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Link href="/impact" className="px-2 py-1 text-foreground hover:text-swahilipot-600 transition-colors">
                        Impact
                    </Link>
                    <Link href="/contact" className="px-2 py-1 text-foreground hover:text-swahilipot-600 transition-colors">
                        Contact
                    </Link>
                    <Button className="bg-[#6A1383] hover:bg-[#5a0f70] text-white flex items-center gap-2 ml-2" asChild>
                        <Link href="/events">
                            <Heart size={16} /> Events
                        </Link>
                    </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-swahilipot-600 focus:outline-none p-2"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white absolute top-16 w-full border-b shadow-lg">
                    <div className="flex flex-col space-y-2 px-4 py-4">
                        <Link href="/" className="text-foreground hover:text-swahilipot-600 transition-colors py-2" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link href="/about" className="text-foreground hover:text-swahilipot-600 transition-colors py-2" onClick={toggleMenu}>
                            About
                        </Link>

                        <div className="py-2">
                            <div className="flex items-center justify-between text-foreground">
                                <Link href="/programs" className="hover:text-swahilipot-600 transition-colors" onClick={toggleMenu}>
                                    Programs
                                </Link>
                            </div>
                            <div className="pl-4 mt-2 border-l border-gray-200 space-y-2">
                                {programs.map((item) => (
                                    <Link
                                        key={item._id || item.href}
                                        href={item.href}
                                        className="block text-sm text-gray-600 hover:text-swahilipot-600 py-1"
                                        onClick={toggleMenu}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="flex items-center justify-between text-foreground">
                                <span className="text-foreground">Departments</span>
                            </div>
                            <div className="pl-4 mt-2 border-l border-gray-200 space-y-2">
                                {departments.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block text-sm text-gray-600 hover:text-swahilipot-600 py-1"
                                        onClick={toggleMenu}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/impact" className="text-foreground hover:text-swahilipot-600 transition-colors py-2" onClick={toggleMenu}>
                            Impact
                        </Link>
                        <Link href="/contact" className="text-foreground hover:text-swahilipot-600 transition-colors py-2" onClick={toggleMenu}>
                            Contact
                        </Link>
                        <Button className="bg-[#6A1383] hover:bg-[#5a0f70] text-white w-full flex items-center justify-center gap-2 mt-2" asChild>
                            <Link href="/events" onClick={toggleMenu}>
                                <Heart size={16} /> Events
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
