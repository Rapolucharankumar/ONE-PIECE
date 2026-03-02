/**
 * Calculates the next upcoming Sunday at 9:30 AM JST (Japan Standard Time).
 * This is when One Piece traditionally airs in Japan.
 * @returns {Date} The Date object representing the next airing time.
 */
export function getNextEpisodeDate(): Date {
    const now = new Date();
    // Get current time in JST (UTC+9)
    const jstOffset = 9 * 60 * 60 * 1000;
    const nowJST = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + jstOffset);

    // Calculate days until next Sunday (0 is Sunday)
    let daysUntilNextSunday = 0 - nowJST.getDay();
    if (daysUntilNextSunday <= 0) {
        // If today is Sunday, but it's past 9:30 AM JST, get next week's Sunday
        if (daysUntilNextSunday === 0 && (nowJST.getHours() > 9 || (nowJST.getHours() === 9 && nowJST.getMinutes() >= 30))) {
            daysUntilNextSunday = 7;
        } else if (daysUntilNextSunday < 0) {
            daysUntilNextSunday += 7;
        }
    }

    const nextSundayJST = new Date(nowJST);
    nextSundayJST.setDate(nowJST.getDate() + daysUntilNextSunday);
    nextSundayJST.setHours(9, 30, 0, 0);

    // Convert back from JST to local standard Date object for accurate countdown calculation
    const localNextSunday = new Date(nextSundayJST.getTime() - jstOffset - now.getTimezoneOffset() * 60000);
    return localNextSunday;
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
