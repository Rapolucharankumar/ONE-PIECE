import Link from "next/link";
import { getAnimeInfo } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

type EpisodeDetailProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: EpisodeDetailProps) {
    const { id } = await params;
    return {
        title: `Episode ${id} | One Piece Universe`,
        description: `Details for One Piece Episode ${id}`,
    };
}

export default async function EpisodeDetail({ params }: EpisodeDetailProps) {
    const { id } = await params;
    // Jikan v4 doesn't have a direct "get episode by ID" for anime,
    // we would normally match it from the list or fetch if supported.
    // For UI mockup purposes relying on general info and ID.
    const anime = await getAnimeInfo();

    return (
        <div className="min-h-screen text-white pt-10 pb-20 max-w-4xl mx-auto">

            <Link href="/episodes" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors mb-12 font-medium uppercase tracking-widest text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Episodes
            </Link>

            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 blur-[100px] rounded-full" />

                <span className="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-sm font-bold border border-[#FFD700]/20 tracking-widest mb-6">
                    EPISODE {id}
                </span>

                <h1 className="text-5xl md:text-6xl font-bold font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight">
                    One Piece Episode {id}
                </h1>

                <div className="grid grid-cols-2 gap-8 py-8 border-t border-b border-white/10 mb-8">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Anime Series</p>
                        <p className="font-bold text-xl">{anime.title}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Total Episodes</p>
                        <p className="font-bold text-xl">{anime.episodes}</p>
                    </div>
                </div>

                <p className="text-gray-400 leading-relaxed text-lg italic">
                    * Note: Specific episode descriptions rely on alternative API sources or direct Jikan iteration matching.
                </p>
            </div>
        </div>
    );
}
