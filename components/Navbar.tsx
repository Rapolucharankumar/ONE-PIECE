"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Characters", href: "/characters" },
    { name: "Episodes", href: "/episodes" },
    { name: "Release", href: "/release" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg-primary/80 border-b border-bg-secondary">
            <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 xl:px-20 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-accent-gold uppercase">
                    One Piece Universe
                </Link>
                <div className="flex gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                            <Link key={link.name} href={link.href} className="relative py-2 text-lg font-medium transition-colors hover:text-accent-gold">
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold"
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
