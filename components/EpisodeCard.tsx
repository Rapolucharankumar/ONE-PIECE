"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Episode } from "@/types/episode";
import { Film, Calendar } from "lucide-react";

interface Props {
    episode: Episode;
    index: number;
}

export default function EpisodeCard({ episode, index }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link href={`/episodes/${episode.number}`} className="group">
                <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 hover:border-white/30 transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-gold to-yellow-600 opacity-80 group-hover:opacity-100 transition-opacity">
                            #{episode.number}
                        </span>
                        {episode.is_filler && (
                            <span className="bg-red-900/40 text-red-400 text-xs px-2 py-1 rounded border border-red-800/50">
                                Filler
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-14">
                        {episode.title || `Episode ${episode.number}`}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
                        {episode.arc && (
                            <div className="flex items-center gap-1">
                                <Film size={14} className="text-accent-gold" />
                                <span>{episode.arc}</span>
                            </div>
                        )}
                        {episode.release_date && (
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{new Date(episode.release_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
