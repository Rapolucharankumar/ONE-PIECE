import Link from "next/link";
import { getAnimeInfo, getEpisodeById } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

type EpisodeDetailProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: EpisodeDetailProps) {
    const { id } = await params;
    const ep = await getEpisodeById(id);
    return {
        title: `Episode ${id}: ${ep?.title || ""} | One Piece Universe`,
        description: ep?.synopsis?.substring(0, 150) || `Details for One Piece Episode ${id}`,
    };
}

export default async function EpisodeDetail({ params }: EpisodeDetailProps) {
    const { id } = await params;
    const anime = await getAnimeInfo();
    const episode = await getEpisodeById(id);

    // Hardcoded Arc Mapping Dictionary natively in component
    const getArc = (epId: string) => {
        const ep = parseInt(epId);
        if (ep >= 1 && ep <= 61) return "East Blue Saga";
        if (ep >= 62 && ep <= 135) return "Alabasta Saga";
        if (ep >= 136 && ep <= 206) return "Sky Island Saga";
        if (ep >= 207 && ep <= 325) return "Water 7 Saga";
        if (ep >= 326 && ep <= 384) return "Thriller Bark Saga";
        if (ep >= 385 && ep <= 516) return "Summit War Saga";
        if (ep >= 517 && ep <= 574) return "Fish-Man Island Saga";
        if (ep >= 575 && ep <= 746) return "Dressrosa Saga";
        if (ep >= 747 && ep <= 891) return "Whole Cake Island Saga";
        if (ep >= 892 && ep <= 1085) return "Wano Country Saga";
        if (ep >= 1086 && ep <= 1155) return "Egghead Arc";
        if (ep >= 1156) return "Elbaph Arc";
        return "Unknown Arc";
    };

    return (
        <div className="min-h-screen text-white pt-10 pb-20 max-w-4xl mx-auto">

            <Link href="/episodes" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors mb-12 font-medium uppercase tracking-widest text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Episodes
            </Link>

            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 blur-[100px] rounded-full" />

                <span className="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-sm font-bold border border-[#FFD700]/20 tracking-widest mb-6">
                    EPISODE {id} • {getArc(id)}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight">
                    {episode?.title || `One Piece Episode ${id}`}
                </h1>

                {episode?.title_japanese && (
                    <p className="text-xl text-gray-400 font-serif mb-8">{episode.title_japanese}</p>
                )}

                <div className="grid grid-cols-2 gap-8 py-8 border-t border-b border-white/10 mb-8">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Original Air Date</p>
                        <p className="font-bold text-xl">{episode?.aired ? new Date(episode.aired).toLocaleDateString() : 'TBD'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">MyAnimeList Score</p>
                        <p className="font-bold text-xl">{episode?.score || 'N/A'}</p>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl text-[#FFD700] uppercase tracking-widest font-bold mb-4">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                        {episode?.synopsis || "No synopsis is available for this episode yet."}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                    <a href="https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece" target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#F47521] hover:bg-[#F47521]/80 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2">
                        Watch on Crunchyroll
                    </a>
                    <a href="https://www.netflix.com/title/80107103" target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#E50914] hover:bg-[#E50914]/80 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2">
                        Watch on Netflix
                    </a>
                </div>
            </div>
        </div>
    );
}
