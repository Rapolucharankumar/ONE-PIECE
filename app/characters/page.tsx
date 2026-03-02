import Image from "next/image";
import Link from "next/link";
import { getCharacters } from "@/lib/api";

export async function generateMetadata() {
    return {
        title: "Characters | One Piece Universe",
        description: "Browse the legendary characters of the One Piece universe.",
    };
}

export default async function Characters() {
    const characters = await getCharacters();

    return (
        <div className="min-h-screen text-white pt-10">
            <h1 className="text-6xl md:text-7xl font-bold font-serif mb-16 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                CHARACTERS
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-10">
                {characters?.map((char: any) => (
                    <Link
                        key={char.character.mal_id}
                        href={`/characters/${char.character.mal_id}`}
                        className="group relative flex flex-col items-center glass p-4 rounded-3xl glow-hover"
                    >
                        <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-2xl border border-white/5 group-hover:border-[#FFD700]/50 transition-colors shadow-2xl">
                            <Image
                                src={char.character.images.jpg.image_url}
                                alt={char.character.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                            />
                        </div>

                        <h2 className="text-lg md:text-xl font-bold font-serif text-center group-hover:text-[#FFD700] transition-colors line-clamp-2 px-2">
                            {char.character.name}
                        </h2>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{char.role || "Character"}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
