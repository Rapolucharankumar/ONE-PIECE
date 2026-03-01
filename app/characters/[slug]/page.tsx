import { getCharacter, getEpisodes } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import EpisodeCard from "@/components/EpisodeCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function CharacterDetail({ params }: Props) {
    const resolvedParams = await params;
    const character = await getCharacter(resolvedParams.slug);

    if (!character) {
        notFound();
    }

    // Fetch all episodes, then filter manually (inefficient for large DB, but works for MVP)
    // In a real app we'd map via a junction table
    const allEpisodes = await getEpisodes() || [];
    const appearedIn = allEpisodes.filter(ep =>
        ep.number >= (character.first_episode || 0) && ep.number <= (character.first_episode ? character.first_episode + 10 : 0) // Placeholder logic for "appearances"
    );

    return (
        <div className="py-12 max-w-6xl mx-auto">
            <Link href="/characters" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors mb-10">
                <ArrowLeft size={20} /> Back to Database
            </Link>

            <div className="bg-bg-secondary rounded-3xl overflow-hidden border border-gray-800 mb-16">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-96 md:h-auto min-h-[500px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={character.image_url || `https://ui-avatars.com/api/?name=${character.name}&background=151522&color=facc15&size=512`}
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 p-8 md:p-12">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-5xl md:text-6xl font-black text-white">{character.name}</h1>
                            {character.status && (
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${character.status === 'Alive' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                    {character.status}
                                </span>
                            )}
                        </div>

                        {character.bounty && (
                            <div className="mb-8 inline-block bg-bg-primary border border-accent-gold/50 px-6 py-3 rounded-2xl shadow-lg">
                                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-1">Bounty</span>
                                <span className="text-3xl font-black text-accent-gold block">
                                    ฿ {character.bounty.toLocaleString()}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-1">Crew / Affiliation</span>
                                <span className="text-xl font-bold text-white">{character.crew || "Independent"}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-1">Devil Fruit</span>
                                <span className="text-xl font-bold text-purple-400">{character.devil_fruit || "None"}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm text-gray-400 uppercase tracking-widest block mb-1">Haki Mastery</span>
                                <div className="flex gap-2 mt-2">
                                    {character.haki && character.haki.length > 0 ? character.haki.map((hakiType: string) => (
                                        <span key={hakiType} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm font-medium border border-gray-700">
                                            {hakiType}
                                        </span>
                                    )) : (
                                        <span className="text-gray-500 italic">No Haki</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {character.story && (
                            <div className="border-t border-gray-800 pt-8 mt-4">
                                <h3 className="text-2xl font-bold text-white mb-4">Background</h3>
                                <p className="text-gray-300 leading-relaxed font-serif text-lg">
                                    {JSON.stringify(character.story)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {appearedIn.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-4xl font-black text-white mb-8 border-l-4 border-accent-gold pl-4">First Appearances</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appearedIn.map((ep, idx) => (
                            <EpisodeCard key={ep.number} episode={ep as any} index={idx} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
