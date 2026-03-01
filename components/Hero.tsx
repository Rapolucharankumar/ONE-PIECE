"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl mt-8">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1611002214172-11c7d2d0b5e2?q=80&w=3000&auto=format&fit=crop')", // Pirate ship aesthetic stock image
                    filter: "brightness(0.3) contrast(1.2)"
                }}
            />

            {/* Content */}
            <div className="z-10 text-center px-4 max-w-5xl">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Discover The <span className="text-accent-gold">One Piece</span> Universe
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    The ultimate compendium mapping every arc, episode, and character in the Grand Line.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <a href="#explore" className="inline-block px-8 py-4 bg-accent-gold text-bg-primary font-bold text-lg rounded-full hover:bg-yellow-300 transition-colors">
                        Start Exploring
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
