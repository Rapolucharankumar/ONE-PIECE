import Link from "next/link";
import { getEpisodes } from "@/lib/api";

export async function generateMetadata() {
    return {
        title: "Episodes | One Piece Universe",
        description: "Browse the legendary episodes of the One Piece anime.",
    };
}

export default async function Episodes() {
    const episodes = await getEpisodes(1);

    return (
        <div className="min-h-screen text-white pt-10">
            <h1 className="text-6xl md:text-7xl font-bold font-serif mb-16 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                EPISODES
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes?.map((ep: any) => (
                    <Link
                        href={`/episodes/${ep.mal_id}`}
                        key={ep.mal_id}
                        className="group glass p-6 rounded-3xl glow-hover flex flex-col justify-between min-h-[160px]"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-xs font-bold border border-[#FFD700]/20 tracking-widest">
                                    EP {ep.mal_id}
                                </span>
                                <span className="text-sm text-gray-400 font-medium">
                                    {ep.aired ? new Date(ep.aired).toLocaleDateString() : 'TBD'}
                                </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold font-serif group-hover:text-[#FFD700] transition-colors line-clamp-2 pr-4 leading-tight">
                                {ep.title}
                            </h2>
                        </div>

                        {ep.score && (
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-[#FFD700]">★</span> {ep.score}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
