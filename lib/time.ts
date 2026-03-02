/**
 * Calculates the next upcoming Sunday at 9:30 AM JST (Japan Standard Time).
 * This is when One Piece traditionally airs in Japan.
 * Currently hardcoded to April 5th, 2026 (First Sunday in April) due to the Elbaph Arc Hiatus.
 * @returns {Date} The Date object representing the next airing time.
 */
export function getNextEpisodeDate(): Date {
    const now = new Date();
    // Get current time in JST (UTC+9)
    const jstOffset = 9 * 60 * 60 * 1000;

    // Target Date: April 5, 2026 09:30:00 JST
    // Note: Month Index is 0-based, so April is index 3.
    const targetJST = new Date(Date.UTC(2026, 3, 5, 0, 30, 0)); // 00:30 UTC is 09:30 JST

    return new Date(targetJST.getTime());
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
