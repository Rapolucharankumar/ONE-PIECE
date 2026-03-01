"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
    placeholder?: string;
}

export default function SearchBar({ placeholder = "Search the Grand Line..." }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (query) {
                params.set("q", query);
            } else {
                params.delete("q");
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, pathname, searchParams]);

    return (
        <div className="relative max-w-2xl w-full mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-accent-gold">
                <Search size={24} />
            </div>
            <input
                type="text"
                className="block w-full pl-16 pr-20 py-5 bg-bg-secondary/50 border border-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all shadow-xl text-lg backdrop-blur-md"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                <button className="p-2 hover:text-accent-gold transition-colors hover:bg-gray-800 rounded-full">
                    <SlidersHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}
