import { getEpisode } from "@/lib/queries";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, Film } from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ number: string }>;
}

export default async function EpisodeDetail({ params }: Props) {
    const resolvedParams = await params;
    const num = parseInt(resolvedParams.number, 10);
    if (isNaN(num)) notFound();

    const episode = await getEpisode(num);
    if (!episode) notFound();

    return (
        <div className="py-12 max-w-4xl mx-auto min-h-[70vh]">
            <Link href="/episodes" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors mb-10 font-medium">
                <ArrowLeft size={20} /> Back to Archive
            </Link>

            <div className="bg-bg-secondary/50 rounded-3xl p-8 md:p-12 border border-gray-800 backdrop-blur-md relative overflow-hidden">
                {episode.is_filler && (
                    <div className="absolute top-0 right-0 bg-red-900 text-red-100 font-bold px-8 py-2 rounded-bl-3xl">
                        FILLER EPISODE
                    </div>
                )}

                <div className="mb-4">
                    <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-gold to-yellow-600/20 opacity-30 select-none absolute -top-10 -left-10 z-0 tracking-tighter">
                        #{episode.number}
                    </span>
                    <div className="relative z-10">
                        <span className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-2 block">
                            Episode {episode.number}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                            {episode.title || `Untitled Episode ${episode.number}`}
                        </h1>

                        <div className="flex flex-wrap gap-6 mb-10 bg-bg-primary/50 p-6 rounded-2xl border border-gray-800">
                            {episode.release_date && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-900/50 p-3 rounded-xl">
                                        <Calendar size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Aired</span>
                                        <span className="font-medium text-gray-200">
                                            {new Date(episode.release_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {episode.arc && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-900/50 p-3 rounded-xl">
                                        <Film size={20} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Story Arc</span>
                                        <span className="font-medium text-gray-200">{episode.arc}</span>
                                    </div>
                                </div>
                            )}

                            {episode.manga_adaptation && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-900/50 p-3 rounded-xl">
                                        <BookOpen size={20} className="text-green-400" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Adapts Chapter</span>
                                        <span className="font-medium text-gray-200">Ch. {episode.manga_adaptation}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
                            <p className="text-gray-300 leading-relaxed font-serif">
                                {episode.summary || "Summary data is unavailable for this episode."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
