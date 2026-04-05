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

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
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
