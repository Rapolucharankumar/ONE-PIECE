import Image from "next/image";
import Link from "next/link";
import { searchGlobal } from "@/lib/api";

type SearchPageProps = {
    searchParams: {
        q?: string;
    };
};

export async function generateMetadata({ searchParams }: SearchPageProps) {
    const query = searchParams.q || "";
    return {
        title: `Search: ${query} | One Piece Universe`,
        description: `Search results for ${query} in the One Piece Universe. Find characters, episodes, and more.`,
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || "";
    const results = query ? await searchGlobal(query) : { characters: [], episodes: [] };

    return (
        <div className="min-h-screen text-white pt-10">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                    Search Results for <span className="text-[#FFD700]">"{query}"</span>
                </h1>
                <p className="text-gray-400 text-lg">
                    Found {results.characters.length} characters and {results.episodes.length} episodes.
                </p>
            </div>

            <div className="space-y-16">
                {results.characters.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-serif mb-8 border-b border-white/10 pb-4">Characters</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {results.characters.map((char: any) => (
                                <Link
                                    key={char.mal_id}
                                    href={`/characters/${char.mal_id}`}
                                    className="group relative flex flex-col items-center bg-[#1a1a2e]/60 backdrop-blur-sm p-4 rounded-2xl glass glow-hover"
                                >
                                    <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl border border-white/5 group-hover:border-[#FFD700]/50 transition-colors">
                                        <Image
                                            src={char.images?.jpg?.image_url}
                                            alt={char.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-center group-hover:text-[#FFD700] transition-colors line-clamp-2">
                                        {char.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {results.episodes.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-serif mb-8 border-b border-white/10 pb-4">Episodes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {results.episodes.map((ep: any) => (
                                <Link
                                    key={ep.mal_id}
                                    href={`/episodes/${ep.mal_id}`}
                                    className="group flex flex-col justify-between bg-[#1a1a2e]/60 backdrop-blur-sm p-6 rounded-2xl glass glow-hover min-h-[160px]"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-xs font-bold border border-[#FFD700]/20">
                                                EP {ep.mal_id}
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                {new Date(ep.aired).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold font-serif group-hover:text-[#FFD700] transition-colors line-clamp-2">
                                            {ep.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {query && results.characters.length === 0 && results.episodes.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-gray-500 font-serif">No results found matching your criteria.</h2>
                        <p className="text-gray-600 mt-4">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
