import { getCharacters } from "@/lib/api";
import CharacterCard from "@/components/CharacterCard";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { JikanCharacter } from "@/types/character";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CharactersPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;
    const q = typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";

    const allCharactersResponse = await getCharacters() || [];

    // Sort array by highest favorites globally
    let characters = (allCharactersResponse as JikanCharacter[]).sort((a, b) => b.favorites - a.favorites);

    if (q) {
        characters = characters.filter(char => char.character.name.toLowerCase().includes(q));
    }

    return (
        <div className="py-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight uppercase">
                Grand Line <span className="text-accent-gold">Database</span>
            </h1>

            <Suspense fallback={<div className="h-[76px] w-full max-w-2xl mx-auto rounded-full bg-bg-secondary/50 animate-pulse border border-gray-800" />}>
                <SearchBar placeholder="Search characters by name..." />
            </Suspense>

            <div className="flex justify-between items-center mb-10 mt-6">
                <p className="text-gray-400 font-medium">Tracking top {characters.length} global favorites.</p>
            </div>

            {characters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {characters.map((char, idx) => (
                        <CharacterCard key={char.character.mal_id} character={char} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-bg-secondary rounded-3xl border border-gray-800">
                    <p className="text-2xl text-gray-400 font-bold mb-2">No characters found</p>
                    <p className="text-gray-500">Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    );
}
