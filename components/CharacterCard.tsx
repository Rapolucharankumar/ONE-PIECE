"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { JikanCharacter } from "@/types/character";

interface Props {
    character: JikanCharacter;
    index: number;
}

export default function CharacterCard({ character, index }: Props) {
    const char = character.character;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/characters/${char.mal_id}`} className="group block h-full">
                <div className="relative bg-[#1a1a2e] h-full rounded-2xl overflow-hidden border border-gray-800 hover:border-accent-gold transition-colors duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] flex flex-col cursor-pointer">
                    <div className="relative h-80 w-full overflow-hidden bg-bg-secondary flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={char.images?.jpg?.image_url || `https://ui-avatars.com/api/?name=${char.name}&background=151522&color=facc15&size=512`}
                            alt={char.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-gold transition-colors line-clamp-2">
                                {char.name}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${character.role === 'Main' ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30' : 'bg-gray-800 text-gray-300'}`}>
                                {character.role}
                            </span>
                            <span className="text-xs bg-red-900/40 text-red-300 px-3 py-1 rounded-full border border-red-900/50 flex items-center gap-1">
                                ♥ {character.favorites.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
