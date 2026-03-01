import { getEpisodes } from "@/lib/queries";
import EpisodeCard from "@/components/EpisodeCard";
import SearchBar from "@/components/SearchBar";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EpisodesPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const q = typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";
    const arc = typeof resolvedParams.arc === "string" ? resolvedParams.arc : "";

    const allEpisodes = await getEpisodes() || [];

    const filtered = allEpisodes.filter(ep => {
        const matchQ = q ? (ep.title?.toLowerCase().includes(q) || ep.number.toString().includes(q)) : true;
        const matchArc = arc ? ep.arc === arc : true;
        return matchQ && matchArc;
    });

    const arcs = Array.from(new Set(allEpisodes.map(ep => ep.arc).filter(Boolean)));

    return (
        <div className="py-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase">
                Episode <span className="text-accent-gold">Archive</span>
            </h1>

            <SearchBar placeholder="Search by title or episode number..." />

            <div className="flex flex-wrap gap-3 mt-8 mb-16 justify-center max-w-4xl mx-auto">
                <a href="/episodes" className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${!arc ? 'bg-accent-gold text-bg-primary border-accent-gold' : 'bg-transparent text-gray-400 border-gray-800 hover:border-accent-gold'}`}>
                    All Arcs
                </a>
                {arcs.map(a => (
                    <a key={String(a)} href={`/episodes?arc=${encodeURIComponent(String(a))}${q ? `&q=${q}` : ''}`} className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${arc === a ? 'bg-accent-gold text-bg-primary border-accent-gold' : 'bg-transparent text-gray-400 border-gray-800 hover:border-accent-gold'}`}>
                        {String(a)}
                    </a>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400 font-medium">Showing {filtered.length} episodes</p>
            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((ep, idx) => (
                        <EpisodeCard key={ep.number} episode={ep as any} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-bg-secondary rounded-3xl border border-gray-800">
                    <p className="text-2xl text-gray-400 font-bold mb-2">No episodes found</p>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
