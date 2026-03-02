"use client";

import { useEffect, useState } from "react";
import { getNextEpisodeDate, calculateTimeRemaining } from "@/lib/time";

export default function CountdownTimer() {
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Run once on mount to establish the target date on the client
        const nextDate = getNextEpisodeDate();
        setTargetDate(nextDate);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!targetDate) return;

        // Perform immediate calculation to avoid 1 second initial flash
        setTimeLeft(calculateTimeRemaining(targetDate));

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Prevent hydration errors by not rendering the times until mounted
    if (!isMounted) {
        return (
            <div className="flex gap-4 opacity-0">...</div>
        )
    }

    const timeBlocks = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINS", value: timeLeft.minutes },
        { label: "SECS", value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            {timeBlocks.map((block) => (
                <div key={block.label} className="glass px-6 py-4 rounded-2xl flex flex-col items-center min-w-[100px] border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                    <span className="text-4xl md:text-5xl font-bold font-mono text-[#FFD700] tabular-nums">
                        {String(block.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 mt-2 tracking-widest uppercase">{block.label}</span>
                </div>
            ))}
        </div>
    );
}
