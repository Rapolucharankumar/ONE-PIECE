import { getAnimeInfo } from "@/lib/api";

export default async function Release() {
    const anime = await getAnimeInfo();

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white px-20 py-20">
            <h1 className="text-6xl font-bold mb-8">Release Tracker</h1>
            <p className="text-3xl">Latest Episode: {anime.episodes}</p>
        </div>
    );
}
