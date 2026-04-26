"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { HakiPulse, HakiLightning, ScreenShake } from "./MotionComponents";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isBursting, setIsBursting] = useState(false);
    const [flashActive, setFlashActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Start the logic automatically on mount
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked by browser. Interaction may be required.", e));
        }

        // Timeline logic for the "Anime Burst"
        const burstTimer = setTimeout(() => {
            setIsBursting(true);
            setFlashActive(true);
            setTimeout(() => setFlashActive(false), 300);
            setTimeout(() => setIsBursting(false), 2000);
        }, 500);

        const endTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3500);

        document.body.style.overflow = "hidden";
        
        return () => {
            clearTimeout(burstTimer);
            clearTimeout(endTimer);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        scale: 1.5,
                        filter: "blur(50px)",
                        transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[999] bg-[#000] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Audio Element (Mixkit Cinematic Impact) */}
                    <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" preload="auto" />

                    <div className="w-full h-full relative flex items-center justify-center">
                        {/* Negative Flash Overlay */}
                        <AnimatePresence>
                            {flashActive && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[1000] bg-white mix-blend-difference pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        <ScreenShake active={isBursting} intensity={12}>
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                
                                {/* CINEMATIC GENERATED BACKGROUND IMAGE */}
                                <motion.div 
                                    initial={{ scale: 1, opacity: 0.2 }}
                                    animate={isBursting ? { 
                                        scale: [1, 1.2, 1.1], 
                                        opacity: [0.2, 1, 0.4],
                                        filter: ["blur(5px)", "blur(0px)", "blur(10px)"]
                                    } : { opacity: 0.4 }}
                                    transition={{ duration: 3, ease: "easeOut" }}
                                    className="absolute inset-0 z-0 bg-cover bg-center grayscale contrast-150"
                                    style={{ backgroundImage: "url('/haki-cinematic.png')" }}
                                />

                                {/* Cinematic Background Glow */}
                                <motion.div 
                                    animate={isBursting ? { scale: [1, 2.5], opacity: [0.3, 0.9, 0] } : {}}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute inset-0 bg-gradient-radial from-red-600/30 to-transparent pointer-events-none" 
                                />
                                
                                {/* Realistic Haki Lightning & Pulses */}
                                <HakiPulse color="#ff0000" />
                                
                                {isBursting && (
                                    <>
                                        <HakiLightning color="#ff0000" />
                                        <div className="scale-150">
                                            <HakiLightning color="#ffffff" />
                                        </div>
                                        <div className="rotate-45 scale-110">
                                            <HakiLightning color="#ff0000" />
                                        </div>
                                    </>
                                )}

                                {/* Logo/Text Reveal with Intense Distortion */}
                                <div className="relative flex flex-col items-center z-10">
                                    <motion.div
                                        initial={{ letterSpacing: "2em", opacity: 0, scale: 0.5 }}
                                        animate={{ 
                                            letterSpacing: isBursting ? "0.05em" : "0.2em", 
                                            opacity: 1, 
                                            scale: isBursting ? [1, 1.2, 1.1] : 1,
                                            textShadow: isBursting ? [
                                                "0 0 0px #ff0000",
                                                "0 0 50px #ff0000",
                                                "0 0 20px #ff0000"
                                            ] : "0 0 0px #ff0000"
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-white font-serif text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.2em] mb-4 select-none drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]"
                                    >
                                        ONE PIECE
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ 
                                            opacity: 0.9, 
                                            y: 0,
                                            transition: { delay: 1, duration: 1 }
                                        }}
                                        className="text-red-600 text-lg md:text-xl tracking-[0.8em] uppercase font-black select-none drop-shadow-[0_0_10px_#000]"
                                    >
                                        The King Awakens
                                    </motion.div>
                                </div>

                                {/* Final Energy Burst Circle */}
                                <motion.div
                                    animate={isBursting ? { scale: [0, 6], opacity: [1, 0] } : { opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="absolute w-64 h-64 border-[20px] border-white rounded-full pointer-events-none"
                                />
                            </div>
                        </ScreenShake>
                    </div>

                    {/* Progress Detail */}
                    <div className="absolute bottom-20 w-80 h-[3px] bg-white/5 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 3.5, ease: "linear" }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_#ff0000]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
