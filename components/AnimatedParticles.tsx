"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedParticles() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // Generate constant particles on client to avoid hydration mismatch
        const generated = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
        }));
        setParticles(generated);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#FFD700]/10 blur-[1px]"
                    style={{
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: ["0vh", "-100vh"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent pointer-events-none" />
        </div>
    );
}
