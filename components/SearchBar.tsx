"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ characters: any[]; episodes: any[] }>({ characters: [], episodes: [] });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query.trim()) {
                setResults({ characters: [], episodes: [] });
                setIsOpen(false);
                return;
            }

            setLoading(true);
            setIsOpen(true);

            try {
                const [charRes, epRes] = await Promise.all([
                    fetch(`https://api.jikan.moe/v4/characters?q=${query}&limit=5`).then(res => res.json()),
                    fetch(`https://api.jikan.moe/v4/anime/21/episodes`).then(res => res.json())
                ]);

                // Filter episodes locally since Jikan doesn't have a direct anime specific episode search endpoint
                const filteredEps = (epRes.data || []).filter((ep: any) =>
                    ep.title.toLowerCase().includes(query.toLowerCase()) ||
                    ep.mal_id.toString() === query.trim()
                ).slice(0, 5);

                setResults({
                    characters: charRes.data || [],
                    episodes: filteredEps
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const allResults = [
        ...results.characters.map(c => ({ ...c, type: 'character', link: `/characters/${c.mal_id}` })),
        ...results.episodes.map(e => ({ ...e, type: 'episode', link: `/episodes/${e.mal_id}` }))
    ];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || allResults.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0) {
                handleNavigate(allResults[selectedIndex].link);
            } else {
                handleNavigate(`/search?q=${encodeURIComponent(query)}`);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleNavigate = (path: string) => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(-1);
        router.push(path);
    };

    return (
        <div className="relative w-full max-w-md mx-auto z-50" ref={searchRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#FFD700] transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-2.5 bg-[#1a1a2e]/80 border border-white/10 rounded-full leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#0f0f1a] focus:ring-1 focus:ring-[#FFD700] focus:border-[#FFD700] focus:text-white sm:text-sm backdrop-blur-md transition-all duration-300"
                    placeholder="Search characters, episodes..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
                {query && (
                    <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                    >
                        <X className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    </button>
                )}
            </div>

            {isOpen && (query.trim().length > 0) && (
                <div className="absolute mt-2 w-full bg-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-white/5 overflow-hidden">
                    {loading ? (
                        <div className="p-4 flex justify-center items-center">
                            <Loader2 className="h-6 w-6 text-[#FFD700] animate-spin" />
                        </div>
                    ) : allResults.length > 0 ? (
                        <ul className="max-h-96 overflow-y-auto py-2 custom-scrollbar">
                            {allResults.map((item, index) => (
                                <li
                                    key={`${item.type}-${item.mal_id}`}
                                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 ${index === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                                        }`}
                                    onClick={() => handleNavigate(item.link)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    {item.type === 'character' ? (
                                        <>
                                            <img src={item.images?.jpg?.image_url} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-[#FFD700]/30" />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-white">{item.name}</p>
                                                <p className="text-xs text-gray-400">Character</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-[#0f0f1a] border border-[#FFD700]/30 flex items-center justify-center font-bold text-[#FFD700] text-xs">
                                                EP {item.mal_id}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-white line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-gray-400">Episode</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                            <li
                                className="p-3 border-t border-white/10 bg-[#0f0f1a]/50 text-center text-sm text-[#FFD700] hover:bg-[#FFD700]/10 cursor-pointer transition-colors"
                                onClick={() => handleNavigate(`/search?q=${encodeURIComponent(query)}`)}
                            >
                                View all results for "{query}"
                            </li>
                        </ul>
                    ) : (
                        <div className="p-6 text-center text-sm text-gray-400">
                            No results found for "{query}".
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
