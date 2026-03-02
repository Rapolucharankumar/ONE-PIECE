"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Characters", href: "/characters" },
    { name: "Episodes", href: "/episodes" },
    { name: "Release", href: "/release" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#0f0f1a]/80 border-b border-white/5">
            <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 xl:px-20 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-[#FFD700] uppercase flex-shrink-0 font-serif">
                    One Piece Universe
                </Link>

                <div className="flex-1 max-w-xl mx-8">
                    <SearchBar />
                </div>

                <div className="flex gap-8 flex-shrink-0">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                            <Link key={link.name} href={link.href} className="relative py-2 text-sm md:text-base font-medium transition-colors hover:text-[#FFD700]">
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
