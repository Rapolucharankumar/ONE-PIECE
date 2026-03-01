"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNowStrict, differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";

interface Props {
    targetDate: string;
    type: "Episode" | "Chapter";
    number: number;
}

export default function Countdown({ targetDate, type, number }: Props) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const calculateTime = () => {
            const difference = differenceInSeconds(new Date(targetDate), new Date());
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (3600 * 24)),
                    hours: Math.floor((difference % (3600 * 24)) / 3600),
                    minutes: Math.floor((difference % 3600) / 60),
                    seconds: Math.floor(difference % 60),
                });
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isClient) return <div className="animate-pulse h-32 bg-bg-secondary rounded-2xl w-full max-w-2xl mx-auto" />;

    return (
        <div className="bg-bg-secondary/80 backdrop-blur-lg border border-accent-gold/30 p-8 rounded-3xl w-full max-w-3xl mx-auto text-center shadow-[0_0_50px_rgba(250,204,21,0.1)]">
            <h3 className="text-xl text-gray-400 font-bold mb-6 tracking-widest uppercase">
                Next {type} {number}
            </h3>
            <div className="flex justify-center gap-4 sm:gap-8">
                {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                ].map((unit, i) => (
                    <div key={unit.label} className="flex flex-col items-center">
                        <motion.div
                            key={unit.value}
                            initial={{ opacity: 0, y: -20, rotateX: 90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-bg-primary w-16 h-20 sm:w-24 sm:h-28 rounded-xl flex items-center justify-center border border-gray-800 shadow-inner mb-3"
                        >
                            <span className="text-3xl sm:text-5xl font-black text-white">
                                {unit.value.toString().padStart(2, "0")}
                            </span>
                        </motion.div>
                        <span className="text-sm font-medium text-accent-gold">{unit.label}</span>
                    </div>
                ))}
            </div>
            <p className="mt-8 text-gray-500 font-medium">EST: {new Date(targetDate).toLocaleDateString()}</p>
        </div>
    );
}
