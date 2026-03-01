export function getNextSunday() {
    const returnDate = new Date("2026-04-05T00:30:00.000Z"); // Estimated return date for Elbaph Arc start
    const now = new Date();

    // If we are currently in the hiatus period (before April 2026)
    if (now.getTime() < returnDate.getTime()) {
        return returnDate.toISOString();
    }

    const day = now.getDay();
    // If it's Sunday (0), check if it's before or after 9AM. 
    // If before, next airing is today. If after, it's next week.
    const diff = (7 - day) % 7;
    const next = new Date(now);

    // Set to next Sunday
    next.setDate(now.getDate() + diff);
    // Set to 9:30 AM JST (Standard One Piece Airing Time in Japan) -> Converts to Local Browser Time in frontend
    // For simplicity, we just set a UTC base that falls around generic release schedules globally.
    // 00:30 UTC Sunday
    next.setUTCHours(0, 30, 0, 0);

    // If we've already passed the release time today (Sunday), jump to next week
    if (now.getTime() > next.getTime()) {
        next.setDate(next.getDate() + 7);
    }

    return next.toISOString();
}
