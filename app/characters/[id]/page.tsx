import { getCharacter, getEpisodes } from "@/lib/api";
import { notFound } from "next/navigation";
import EpisodeCard from "@/components/EpisodeCard";
import { ArrowLeft, BookOpen, Star, Tv } from "lucide-react";
import Link from "next/link";
import { JikanCharacterDetail } from "@/types/character";
import { JikanEpisode } from "@/types/episode";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function CharacterDetail({ params }: Props) {
    const resolvedParams = await params;
    const character: JikanCharacterDetail = await getCharacter(resolvedParams.id);

    if (!character) {
        notFound();
    }

    // Jikan doesn't provide direct episode mapping per character in the generic endpoint
    // So we show the latest episodes as "Recent Grand Line Activity" for flavor
    const recentEpisodes = await getEpisodes(1) || [];
    const latestActivity = (recentEpisodes as JikanEpisode[]).slice(0, 3);

    return (
        <div className="py-12 max-w-6xl mx-auto">
            <Link href="/characters" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors mb-10">
                <ArrowLeft size={20} /> Back to Database
            </Link>

            <div className="bg-bg-secondary rounded-3xl overflow-hidden border border-gray-800 mb-16 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-[600px] md:h-auto min-h-[500px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={character.images?.jpg?.image_url || `https://ui-avatars.com/api/?name=${character.name}&background=151522&color=facc15&size=512`}
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent md:bg-gradient-to-r" />
                    </div>
                    <div className="md:w-2/3 p-8 md:p-12 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">{character.name}</h1>
                        </div>
                        {character.name_kanji && (
                            <p className="text-2xl text-accent-gold font-bold mb-8 font-serif opacity-80">{character.name_kanji}</p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-10">
                            <div className="bg-red-900/40 text-red-300 px-6 py-2 rounded-xl border border-red-900/50 flex items-center gap-2 font-bold shadow-inner">
                                <Star size={18} fill="currentColor" /> {character.favorites.toLocaleString()} Favorites
                            </div>
                            <div className="bg-purple-900/40 text-purple-300 px-6 py-2 rounded-xl border border-purple-900/50 flex items-center gap-2 font-bold shadow-inner">
                                <Tv size={18} /> Anime Active
                            </div>
                            <div className="bg-blue-900/40 text-blue-300 px-6 py-2 rounded-xl border border-blue-900/50 flex items-center gap-2 font-bold shadow-inner">
                                <BookOpen size={18} /> Manga Canon
                            </div>
                        </div>

                        {character.nicknames && character.nicknames.length > 0 && (
                            <div className="mb-8">
                                <span className="text-sm text-gray-500 uppercase tracking-widest block mb-2 font-bold">Known Aliases</span>
                                <div className="flex flex-wrap gap-2">
                                    {character.nicknames.map(nickname => (
                                        <span key={nickname} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm font-medium border border-gray-700">
                                            &quot;{nickname}&quot;
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {character.about && (
                            <div className="border-t border-gray-800/60 pt-8 mt-8">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    Background
                                </h3>
                                <div className="text-gray-300 leading-relaxed font-serif text-lg whitespace-pre-wrap max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                    {character.about}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {latestActivity.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-4xl font-black text-white mb-8 border-l-4 border-accent-gold pl-4">Recent Grand Line Activity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestActivity.map((ep, idx) => (
                            <EpisodeCard key={ep.mal_id} episode={ep} index={idx} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
