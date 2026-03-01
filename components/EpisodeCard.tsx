"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { JikanEpisode } from "@/types/episode";
import { PlayCircle, Calendar, Star } from "lucide-react";

interface Props {
    episode: JikanEpisode;
    index: number;
    featured?: boolean;
}

export default function EpisodeCard({ episode, index, featured = false }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link href={`/episodes/${episode.mal_id}`} className="group block h-full">
                <div className={`bg-[#1a1a2e] h-full p-6 rounded-2xl border ${featured ? 'border-accent-gold/50 shadow-[0_0_20px_rgba(250,204,21,0.1)]' : 'border-gray-800 hover:border-white/30'} flex flex-col justify-between transition-all hover:-translate-y-2 hover:shadow-xl`}>
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br transition-opacity ${featured ? 'from-accent-gold to-yellow-500 opacity-100' : 'from-accent-gold/70 to-yellow-600/40 opacity-80 group-hover:opacity-100'}`}>
                                #{episode.mal_id}
                            </span>
                            <div className="flex flex-col gap-2 items-end">
                                {episode.filler && (
                                    <span className="bg-red-900/40 text-red-400 text-xs px-2 py-1 rounded font-bold tracking-wider border border-red-800/50 shadow-inner inline-block">
                                        FILLER
                                    </span>
                                )}
                                {episode.recap && (
                                    <span className="bg-blue-900/40 text-blue-400 text-xs px-2 py-1 rounded font-bold tracking-wider border border-blue-800/50 shadow-inner inline-block">
                                        RECAP
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-14 group-hover:text-accent-gold transition-colors">
                            {episode.title}
                        </h3>

                        {episode.title_japanese && (
                            <p className="text-xs text-gray-500 font-medium mb-4 truncate">{episode.title_japanese}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-6 pt-4 border-t border-gray-800/50">
                        {episode.score > 0 && (
                            <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded-lg">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-gray-200">{episode.score.toFixed(1)}</span>
                            </div>
                        )}
                        {episode.aired && (
                            <div className="flex items-center gap-1.5 ml-auto">
                                <Calendar size={14} className="text-accent-gold" />
                                <span>{new Date(episode.aired).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
