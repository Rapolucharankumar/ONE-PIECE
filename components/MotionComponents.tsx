"use client";

import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function FadeIn({ children, delay = 0, y = 30, className = "" }: { children: React.ReactNode, delay?: number, y?: number, className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: y },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({ children, className = "", delay = 0.2 }: { children: React.ReactNode, className?: string, delay?: number }) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: delay
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

export function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}

export function FloatingElement({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function HakiPulse({ color = "#FFD700" }: { color?: string }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                    scale: [0.5, 2, 3],
                    opacity: [0, 0.8, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
                className="absolute w-64 h-64 rounded-full border-[8px]"
                style={{ borderColor: color, boxShadow: `0 0 100px ${color}` }}
            />
        </div>
    );
}

export function ScreenShake({ children, intensity = 5, active = false }: { children: React.ReactNode, intensity?: number, active?: boolean }) {
    return (
        <motion.div
            animate={active ? {
                x: [0, -intensity, intensity, -intensity, 0],
                y: [0, intensity, -intensity, intensity, 0],
            } : { x: 0, y: 0 }}
            transition={{ duration: 0.1, repeat: active ? 10 : 0 }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}

export function HakiLightning({ color = "#ff0000" }: { color?: string }) {
    const lines = Array.from({ length: 8 });
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {lines.map((_, i) => (
                <motion.svg
                    key={i}
                    viewBox="0 0 100 100"
                    className="absolute w-full h-full opacity-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.5, 2],
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        repeatDelay: Math.random() * 1.5
                    }}
                >
                    <motion.path
                        d={`M 50 50 L ${50 + (Math.random() - 0.5) * 80} ${50 + (Math.random() - 0.5) * 80} L ${50 + (Math.random() - 0.5) * 100} ${50 + (Math.random() - 0.5) * 100}`}
                        stroke={color}
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="10 5"
                        animate={{ strokeDashoffset: [0, 20] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                    {/* Glowing outer streak */}
                    <path
                        d={`M 50 50 L ${50 + (Math.random() - 0.5) * 85} ${50 + (Math.random() - 0.5) * 85}`}
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.5"
                    />
                </motion.svg>
            ))}
        </div>
    );
}
