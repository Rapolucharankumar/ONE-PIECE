import { getEpisodes } from "@/lib/api";
import EpisodeCard from "@/components/EpisodeCard";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { JikanEpisode } from "@/types/episode";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EpisodesPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const q = typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";
    const pageParam = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;

    // Fetch episodes from Jikan - handles 100 per page max
    const allEpisodesResponse = await getEpisodes(pageParam) || [];

    let episodes = (allEpisodesResponse as JikanEpisode[]);

    if (q) {
        episodes = episodes.filter(ep => ep.title.toLowerCase().includes(q) || ep.mal_id.toString() === q);
    }

    return (
        <div className="py-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase">
                Episode <span className="text-accent-gold">Archive</span>
            </h1>

            <Suspense fallback={<div className="h-[76px] w-full max-w-2xl mx-auto rounded-full bg-bg-secondary/50 animate-pulse border border-gray-800" />}>
                <SearchBar placeholder="Search by title or episode number..." />
            </Suspense>

            <div className="flex justify-between items-center mb-10 mt-6">
                <p className="text-gray-400 font-medium">Viewing Page {pageParam}</p>
                <div className="flex gap-4">
                    {pageParam > 1 && (
                        <a href={`/episodes?page=${pageParam - 1}${q ? `&q=${q}` : ''}`} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors font-bold text-sm">
                            ← Previous
                        </a>
                    )}
                    <a href={`/episodes?page=${pageParam + 1}${q ? `&q=${q}` : ''}`} className="px-6 py-2 bg-accent-gold hover:bg-yellow-400 text-bg-primary rounded-full transition-colors font-bold text-sm">
                        Next 100 →
                    </a>
                </div>
            </div>

            {episodes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {episodes.map((ep, idx) => (
                        <EpisodeCard key={ep.mal_id} episode={ep} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-bg-secondary rounded-3xl border border-gray-800">
                    <p className="text-2xl text-gray-400 font-bold mb-2">No episodes found</p>
                    <p className="text-gray-500">Try adjusting your search criteria or going back a page.</p>
                </div>
            )}
        </div>
    );
}
