const BASE = "https://api.jikan.moe/v4";

export async function getAnimeInfo() {
    const res = await fetch(`${BASE}/anime/21`, { cache: "no-store" });
    const json = await res.json();
    return json.data;
}

export async function getCharacters() {
    const res = await fetch(`${BASE}/anime/21/characters`, {
        cache: "no-store",
    });
    const json = await res.json();
    return json.data;
}

export async function getCharacter(id: string) {
    const res = await fetch(`${BASE}/characters/${id}`, {
        cache: "no-store",
    });
    const json = await res.json();
    return json.data;
}

export async function getEpisodes(page = 1) {
    const res = await fetch(`${BASE}/anime/21/episodes?page=${page}`, {
        cache: "no-store",
    });
    const json = await res.json();
    return json.data;
}
