/**
 * Calculates the next upcoming Sunday at 9:30 AM JST (Japan Standard Time).
 * This is when One Piece traditionally airs in Japan.
 * @returns {Date} The Date object representing the next airing time.
 */
export function getNextEpisodeDate(): Date {
    const now = new Date();
    
    // Create a date for the known hiatus end point: April 5, 2026 09:30 JST (00:30 UTC)
    const hiatusEnd = new Date(Date.UTC(2026, 3, 5, 0, 30, 0));

    // If we are still before the hiatus end, return that date
    if (now < hiatusEnd) {
        return hiatusEnd;
    }

    // Otherwise, calculate the next Sunday at 09:30 JST
    // Current time in UTC
    const nextSunday = new Date(now);
    
    // Set to 00:30 UTC (which is 09:30 JST)
    nextSunday.setUTCHours(0, 30, 0, 0);
    
    // Calculate days until next Sunday (0 is Sunday)
    const day = nextSunday.getUTCDay();
    let daysToAdd = (7 - day) % 7;
    
    // If it's already Sunday but past 09:30 JST, go to next Sunday
    if (daysToAdd === 0 && now > nextSunday) {
        daysToAdd = 7;
    }
    
    nextSunday.setUTCDate(nextSunday.getUTCDate() + daysToAdd);

    return nextSunday;
}

/**
 * Calculates the remaining time object based on target Date.
 */
export function calculateTimeRemaining(targetDate: Date) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
}
