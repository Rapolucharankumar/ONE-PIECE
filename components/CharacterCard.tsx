"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Character } from "@/types/character";

interface Props {
    character: Character;
    index: number;
}

export default function CharacterCard({ character, index }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/characters/${character.slug}`} className="group block">
                <div className="relative bg-bg-secondary rounded-2xl overflow-hidden border border-gray-800 hover:border-accent-gold transition-colors duration-300">
                    <div className="relative h-96 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={character.image_url || `https://ui-avatars.com/api/?name=${character.name}&background=151522&color=facc15&size=512`}
                            alt={character.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {character.bounty && (
                            <div className="absolute top-4 right-4 bg-bg-primary/90 text-accent-gold backdrop-blur-sm px-4 py-1 rounded-full font-bold text-sm">
                                ฿ {character.bounty.toLocaleString()}
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent-gold transition-colors">
                            {character.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {character.crew && (
                                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                                    {character.crew}
                                </span>
                            )}
                            {character.devil_fruit && (
                                <span className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                                    {character.devil_fruit}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
