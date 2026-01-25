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

type Project = {
    _id: string;
    title: string;
    slug: string;
};

type NavbarProps = {
    programs?: Program[];
    projects?: Project[];
};

export function Navbar({ programs = [], projects = [] }: NavbarProps) {
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

    // Add "All Projects" as the first item
    const allProjects = [
        { _id: "all", title: "All Projects", href: "/projects" },
        ...projects.map((p) => ({
            _id: p._id,
            title: p.title,
            href: `/projects/${p.slug}`,
        })),
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b shadow-sm">
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
                                    Projects
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid grid-cols-2 w-[500px] gap-3 p-4">
                                        {allProjects.map((item) => (
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
                                <Link href="/projects" className="hover:text-swahilipot-600 transition-colors" onClick={toggleMenu}>
                                    Projects
                                </Link>
                            </div>
                            <div className="pl-4 mt-2 border-l border-gray-200 space-y-2">
                                {projects.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/projects/${item.slug}`}
                                        className="block text-sm text-gray-600 hover:text-swahilipot-600 py-1"
                                        onClick={toggleMenu}
                                    >
                                        {item.title}
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
