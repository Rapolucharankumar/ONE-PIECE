"use client";

import { useEffect, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedCounter({ 
    from = 0, 
    to, 
    duration = 2,
    className = "" 
}: { 
    from?: number; 
    to: number | string; 
    duration?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayedValue, setDisplayedValue] = useState(from);
    
    // Check if the 'to' value is actually a number, otherwise just display it as string (e.g. "Ongoing")
    const isNumber = !isNaN(Number(to));

    useEffect(() => {
        if (!isNumber) return;
        
        if (isInView && ref.current) {
            const controls = animate(from, Number(to), {
                duration: duration,
                ease: "easeOut",
                onUpdate(value) {
                    setDisplayedValue(Math.round(value));
                }
            });

            return () => controls.stop();
        }
    }, [isInView, from, to, duration, isNumber]);

    return (
        <motion.span 
            ref={ref} 
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {isNumber ? displayedValue : to}
        </motion.span>
    );
}
