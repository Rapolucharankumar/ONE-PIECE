import { getAllEpisodes } from "@/lib/api";
import EpisodeList from "@/components/EpisodeList";

export async function generateMetadata() {
    return {
        title: "All Episodes | One Piece Universe",
        description: "Browse the complete collection of all 1100+ One Piece anime episodes.",
    };
}

export default async function Episodes() {
    // This calls the loop function which is aggressively cached in Next.js
    const allEpisodes = await getAllEpisodes();

    return (
        <div className="min-h-screen text-white pt-10">
            <h1 className="text-6xl md:text-7xl font-bold font-serif mb-6 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                ALL EPISODES
            </h1>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
                Explore the complete saga. Scroll through every single episode ever aired without hitting rate limits or empty screens.
            </p>

            {allEpisodes.length > 0 ? (
                <EpisodeList episodes={allEpisodes} />
            ) : (
                <div className="text-center py-20 glass rounded-3xl">
                    <p className="text-[#FFD700] text-xl font-bold mb-4">Fetching the Grand Line...</p>
                    <p className="text-gray-400">If this is the very first build, episodes are currently caching on the server to prevent API limits. Please refresh in a moment.</p>
                </div>
            )}
        </div>
    );
}
