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

            // Wait 1000ms to strictly follow <3 requests per second limit safely.
            if (hasNextPage) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

        } catch (error) {
            console.error("Error fetching all episodes at page", page, error);
            break; // Stop loop and return current batch on hard error
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
