"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EpisodeListProps = {
    episodes: any[];
};

export default function EpisodeList({ episodes }: EpisodeListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 60; // Render a healthy chunk per page to avoid 1100 DOM nodes

    const totalPages = Math.ceil(episodes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEpisodes = episodes.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <p className="text-gray-400 font-mono">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, episodes.length)} of {episodes.length} Episodes
                </p>

                {totalPages > 1 && (
                    <div className="flex items-center gap-4 bg-[#1a1a2e]/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-400 hover:text-[#FFD700] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-white font-mono w-20 text-center">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-400 hover:text-[#FFD700] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEpisodes.map((ep: any) => (
                    <Link
                        href={`/episodes/${ep.mal_id}`}
                        key={ep.mal_id}
                        className="group glass p-6 rounded-3xl glow-hover flex flex-col justify-between min-h-[160px]"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-xs font-bold border border-[#FFD700]/20 tracking-widest shrink-0">
                                    EP {ep.mal_id}
                                </span>
                                <span className="text-xs text-gray-400 font-medium shrink-0">
                                    {ep.aired ? new Date(ep.aired).toLocaleDateString() : 'TBD'}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold font-serif group-hover:text-[#FFD700] transition-colors line-clamp-2 pr-4 leading-tight">
                                {ep.title}
                            </h2>
                        </div>

                        {ep.score && (
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-[#FFD700]">★</span> {ep.score}
                            </div>
                        )}
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16 pb-10">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-[#1a1a2e] text-white rounded-full font-bold hover:bg-white/10 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <span className="text-gray-400 font-mono">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-[#FFD700] text-[#0f0f1a] rounded-full font-bold hover:bg-[#FFD700]/80 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
