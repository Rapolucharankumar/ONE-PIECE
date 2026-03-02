import Image from "next/image";
import { getCharacterFull } from "@/lib/api";

type CharacterDetailProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: CharacterDetailProps) {
    const { id } = await params;
    const character = await getCharacterFull(id);
    return {
        title: `${character.name} | One Piece Universe`,
        description: character.about?.substring(0, 150) + "...",
        openGraph: {
            images: [character.images.jpg.image_url]
        }
    };
}

export default async function CharacterDetail({ params }: CharacterDetailProps) {
    const { id } = await params;
    const character = await getCharacterFull(id);

    return (
        <div className="min-h-screen text-white pt-10 pb-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                <div className="w-full lg:w-1/3 xl:w-1/4 relative group shrink-0">
                    <div className="absolute inset-0 bg-[#FFD700] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full" />
                    <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <Image
                            src={character.images.jpg.image_url}
                            alt={character.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            priority
                        />
                    </div>
                </div>

                <div className="flex-1 w-full lg:mt-10">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif mb-6 tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
                        {character.name}
                    </h1>

                    <div className="flex gap-4 mb-10 text-sm font-bold uppercase tracking-widest text-[#FFD700]">
                        {character.nicknames?.map((nickname: string) => (
                            <span key={nickname} className="px-4 py-2 glass rounded-full border border-[#FFD700]/30">{nickname}</span>
                        ))}
                    </div>

                    <div className="glass p-8 rounded-3xl border border-white/5 relative mb-10">
                        <div className="absolute top-0 left-8 -mt-4 px-4 bg-[#0f0f1a] text-[#FFD700] text-sm uppercase tracking-widest font-bold">Biography</div>
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap font-sans">
                            {character.about || "No biography available for this character."}
                        </p>
                    </div>

                    {character.anime && character.anime.length > 0 && (
                        <div className="glass p-8 rounded-3xl border border-white/5 relative">
                            <div className="absolute top-0 left-8 -mt-4 px-4 bg-[#0f0f1a] text-[#FFD700] text-sm uppercase tracking-widest font-bold">Anime Appearances</div>
                            <div className="flex flex-wrap gap-3">
                                {character.anime.slice(0, 10).map((appearance: any) => (
                                    <div key={appearance.anime.mal_id} className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
                                        <span className="text-gray-300 font-medium">{appearance.anime.title}</span>
                                        <span className="text-xs bg-[#FFD700]/10 text-[#FFD700] px-2 py-0.5 rounded-full uppercase tracking-wider">{appearance.role}</span>
                                    </div>
                                ))}
                                {character.anime.length > 10 && (
                                    <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 text-gray-400">
                                        + {character.anime.length - 10} more
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
