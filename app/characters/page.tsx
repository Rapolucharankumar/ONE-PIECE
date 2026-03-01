import { getCharacters } from "@/lib/queries";
import CharacterCard from "@/components/CharacterCard";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CharactersPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const q = typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";
    const crew = typeof resolvedParams.crew === "string" ? resolvedParams.crew : "";

    const allCharacters = await getCharacters() || [];

    const filtered = allCharacters.filter(char => {
        const matchQ = q ? char.name.toLowerCase().includes(q) : true;
        const matchCrew = crew ? char.crew === crew : true;
        return matchQ && matchCrew;
    });

    const crews = Array.from(new Set(allCharacters.map(c => c.crew).filter(Boolean)));

    return (
        <div className="py-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase">
                Grand Line <span className="text-accent-gold">Database</span>
            </h1>

            <Suspense fallback={<div className="h-[76px] w-full max-w-2xl mx-auto rounded-full bg-bg-secondary/50 animate-pulse border border-gray-800" />}>
                <SearchBar placeholder="Search characters by name..." />
            </Suspense>

            {/* Basic Crew Filter - Ideally this would be a client component for interactive filtering, but simple enough for MVP */}
            <div className="flex flex-wrap gap-3 mt-8 mb-16 justify-center max-w-3xl mx-auto">
                <a href="/characters" className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${!crew ? 'bg-accent-gold text-bg-primary border-accent-gold' : 'bg-transparent text-gray-400 border-gray-800 hover:border-accent-gold'}`}>
                    All Crews
                </a>
                {crews.map(c => (
                    <a key={String(c)} href={`/characters?crew=${encodeURIComponent(String(c))}${q ? `&q=${q}` : ''}`} className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${crew === c ? 'bg-accent-gold text-bg-primary border-accent-gold' : 'bg-transparent text-gray-400 border-gray-800 hover:border-accent-gold'}`}>
                        {String(c)}
                    </a>
                ))}
            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filtered.map((char, idx) => (
                        <CharacterCard key={char.id} character={char as any} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-medium">No characters found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
