import Link from "next/link";
import { getCharacters } from "@/lib/api";

export default async function Characters() {
    const characters = await getCharacters();

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white px-20 py-20">
            <h1 className="text-6xl font-bold mb-16">Characters</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {characters?.map((char: any) => (
                    <Link
                        key={char.character.mal_id}
                        href={`/characters/${char.character.mal_id}`}
                    >
                        <div className="bg-[#1a1a2e] p-6 rounded-2xl hover:scale-105 transition">
                            <img
                                src={char.character.images.jpg.image_url}
                                className="rounded-xl mb-4"
                            />
                            <h2 className="text-xl font-semibold">
                                {char.character.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
