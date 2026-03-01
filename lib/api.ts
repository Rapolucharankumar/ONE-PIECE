const BASE = "https://api.jikan.moe/v4";

export async function getAnimeInfo() {
    const res = await fetch(`${BASE}/anime/21`, {
        next: { revalidate: 3600 } // Cache for 1 hour to prevent API rate limits
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

export async function getCharacters() {
    const res = await fetch(`${BASE}/anime/21/characters`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    // Filter out excessive side-characters, returning top 50
    return json.data?.slice(0, 50) || [];
}

export async function getCharacter(id: string) {
    const res = await fetch(`${BASE}/characters/${id}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

export async function getEpisodes(page = 1) {
    const res = await fetch(`${BASE}/anime/21/episodes?page=${page}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
}
