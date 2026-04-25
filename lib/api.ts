const BASE = "https://api.jikan.moe/v4";

// Revalidate times adjusted for final MVP performance
const CACHE_6_HOURS = 21600;
const CACHE_12_HOURS = 43200;

export async function getAnimeInfo() {
    // Official One Piece anime entry is 21
    const res = await fetch(`${BASE}/anime/21`, { next: { revalidate: CACHE_6_HOURS } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

export async function getCharacters() {
    // Fetch characters, caching for 12 hours to avoid heavy payloads
    const res = await fetch(`${BASE}/anime/21/characters`, { next: { revalidate: CACHE_12_HOURS } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
}

export async function getCharacterFull(id: string) {
    const res = await fetch(`${BASE}/characters/${id}/full`, { next: { revalidate: CACHE_12_HOURS } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

export async function getEpisodes() {
    // Deprecated for final MVP in favor of getAllEpisodes, keeping for back compat
    const res = await fetch(`${BASE}/anime/21/episodes?page=1`, { next: { revalidate: CACHE_6_HOURS } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
}

export async function getEpisodeById(id: string) {
    const res = await fetch(`${BASE}/anime/21/episodes/${id}`, { next: { revalidate: CACHE_12_HOURS } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

/**
 * Fetches all 1100+ episodes by looping through Jikan pagination explicitly.
 * Implements a strict 333ms delay between fetches to respect Jikan's 3req/sec rate limits.
 * Return array is massive but Next will cache it for 24 Hours.
 */
export async function getAllEpisodes() {
    let allEpisodes: any[] = [];
    let page = 1;
    let hasNextPage = true;

    // Fetch confirmed episodes from Jikan
    while (hasNextPage) {
        console.log(`Fetching Episodes Page ${page}...`);
        try {
            const res = await fetch(`${BASE}/anime/21/episodes?page=${page}`, { next: { revalidate: CACHE_12_HOURS } });

            if (res.status === 429) {
                console.warn("Jikan Rate Limit Hit! Slowing down considerably to recover...");
                await new Promise((resolve) => setTimeout(resolve, 2000));
                continue; // Retry same page
            }

            if (!res.ok) {
                console.error(`Failed to fetch page ${page}, continuing with what we have.`);
                break;
            }

            const json = await res.json();

            if (json.data && Array.isArray(json.data)) {
                allEpisodes = [...allEpisodes, ...json.data];
            }

            hasNextPage = json.pagination?.has_next_page || false;
            page++;

            if (hasNextPage) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

        } catch (error) {
            console.error("Error fetching all episodes at page", page, error);
            break; 
        }
    }

    // NEW: Sync with live episode tracker to handle API lag
    const liveData = await getLiveEpisodesAndArc();
    const maxFetchedId = allEpisodes.length > 0 ? Math.max(...allEpisodes.map(e => e.mal_id)) : 1155;

    if (liveData.episodes > maxFetchedId) {
        console.log(`API Lag Detected: Jikan has ${maxFetchedId} but Tracker shows ${liveData.episodes}. Adding placeholders.`);
        
        for (let i = maxFetchedId + 1; i <= liveData.episodes; i++) {
            // Estimate air date (weekly Sundays)
            const baseDate = new Date("2026-04-05T09:30:00+09:00"); // Episode 1156
            const weeksToAdd = i - 1156;
            const airDate = new Date(baseDate.getTime() + (weeksToAdd * 7 * 24 * 60 * 60 * 1000));

            allEpisodes.push({
                mal_id: i,
                title: "New Episode - Title Pending",
                aired: airDate.toISOString(),
                score: null,
                filler: false,
                recap: false,
            });
        }
    }

    return allEpisodes;
}

export async function searchGlobal(query: string) {
    // Search results are more dynamic so we cache for 1 hour only
    const [charRes, epRes] = await Promise.all([
        fetch(`${BASE}/characters?q=${query}&limit=20`, { next: { revalidate: 3600 } }),
        fetch(`${BASE}/anime/21/episodes`, { next: { revalidate: 3600 } }) // fallback if getAllEpisodes isn't used
    ]);

    const characters = charRes.ok ? await charRes.json() : { data: [] };
    const allEpisodes = epRes.ok ? await epRes.json() : { data: [] };

    // Convert query to lower case
    const q = query.toLowerCase();

    // Map keywords to specific episode numbers (rudimentary Arc search)
    const ARC_KEYWORDS: Record<string, number> = {
        "east blue": 1,
        "alabasta": 62,
        "skypiea": 153,
        "water 7": 229,
        "enies lobby": 264,
        "thriller bark": 337,
        "sabaody": 385,
        "marineford": 457,
        "fishman island": 517,
        "punk hazard": 579,
        "dressrosa": 629,
        "zou": 751,
        "whole cake": 783,
        "wano": 890,
        "egghead": 1086,
        "elbaph": 1156,
    };

    let targetArcEpisode = ARC_KEYWORDS[q];

    const filteredEps = (allEpisodes.data || []).filter((ep: any) => {
        const titleMatch = ep.title.toLowerCase().includes(q);
        const idMatch = ep.mal_id.toString() === query.trim();
        const arcMatch = targetArcEpisode && ep.mal_id >= targetArcEpisode && ep.mal_id <= targetArcEpisode + 50;
        return titleMatch || idMatch || arcMatch;
    });

    return {
        characters: characters.data || [],
        episodes: filteredEps
    };
}

export const ARC_DATA = [
    { name: "East Blue", start: 1, end: 61 },
    { name: "Alabasta", start: 62, end: 130 },
    { name: "Skypiea", start: 131, end: 206 },
    { name: "Water 7", start: 207, end: 325 },
    { name: "Thriller Bark", start: 326, end: 384 },
    { name: "Summit War", start: 385, end: 516 },
    { name: "Fishman Island", start: 517, end: 574 },
    { name: "Dressrosa", start: 575, end: 746 },
    { name: "Four Emperors", start: 747, end: 1085 },
    { name: "Egghead", start: 1086, end: 1155 },
    { name: "Elbaph", start: 1156, end: Infinity },
];

export async function getLiveEpisodesAndArc() {
    try {
        const query = `
        query {
            Media(idMal: 21, type: ANIME) {
                episodes
                nextAiringEpisode {
                    episode
                    airingAt
                }
            }
        }`;
        
        const res = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query }),
            // Revalidate every 6 hours so it catches new episodes reliably
            next: { revalidate: 21600 } 
        });

        if (!res.ok) throw new Error("Failed to fetch from AniList");

        const json = await res.json();
        
        // Anilist nextAiringEpisode can be null if it's on a break and no schedule is known
        const nextAiring = json.data?.Media?.nextAiringEpisode;
        const nextEpisode = nextAiring?.episode;
        const nextAiringAt = nextAiring?.airingAt;
        
        // If there's a next episode, current is next - 1. 
        // Otherwise calculate based on time passed since April 5th hiatus end
        let currentTotal = nextEpisode ? nextEpisode - 1 : 1155; 
        
        if (!nextEpisode) {
            const now = new Date();
            const hiatusEnd = new Date(Date.UTC(2026, 3, 5, 0, 30, 0));
            if (now > hiatusEnd) {
                const weeksPassed = Math.floor((now.getTime() - hiatusEnd.getTime()) / (7 * 24 * 60 * 60 * 1000));
                currentTotal = 1156 + weeksPassed - 1; // 1156 is the first one back
                // To be safe, if now is before Sunday 09:30 JST of current week, we don't count it yet
                // But weeksPassed floor already does this roughly.
            }
        }

        const currentArc = ARC_DATA.find(arc => currentTotal >= arc.start && currentTotal <= arc.end) || ARC_DATA[ARC_DATA.length - 1];

        return {
            episodes: currentTotal,
            currentArc: currentArc.name,
            totalArcs: ARC_DATA.length,
            nextEpisodeTime: nextAiringAt ? nextAiringAt * 1000 : null
        };
    } catch (err) {
        console.error("Error fetching live episode count", err);
        // Robust fallback logic
        const now = new Date();
        const hiatusEnd = new Date(Date.UTC(2026, 3, 5, 0, 30, 0));
        let episodes = 1155;
        if (now > hiatusEnd) {
            const weeksPassed = Math.floor((now.getTime() - hiatusEnd.getTime()) / (7 * 24 * 60 * 60 * 1000));
            episodes = 1156 + weeksPassed - 1;
        }
        return { episodes, currentArc: episodes >= 1156 ? "Elbaph" : "Egghead", totalArcs: ARC_DATA.length, nextEpisodeTime: null };
    }
}
