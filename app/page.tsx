import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CharacterCard from "@/components/CharacterCard";
import EpisodeCard from "@/components/EpisodeCard";
import Countdown from "@/components/Countdown";
import { getAnimeInfo, getCharacters, getEpisodes } from "@/lib/api";
import { getNextSunday } from "@/lib/countdown";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { JikanCharacter } from "@/types/character";
import { JikanEpisode } from "@/types/episode";

export default async function Home() {
  const [anime, characters, episodes] = await Promise.all([
    getAnimeInfo(),
    getCharacters(),
    getEpisodes(1),
  ]);

  // Jikan sometimes returns varied lengths or un-sorted character arrays. Get the top 4 favorites dynamically.
  const featuredCharacters = (characters as JikanCharacter[])
    ?.sort((a, b) => b.favorites - a.favorites)
    .slice(0, 4) || [];

  const latestEpisodes = (episodes as JikanEpisode[])?.slice(0, 4) || [];
  const nextReleaseISO = getNextSunday();

  const currentEpisodes = anime?.episodes ? Math.max(anime.episodes, 1155) : 1155;
  const nextEpisodeNum = currentEpisodes + 1;

  return (
    <div className="pb-24">
      <Hero />

      <div className="mt-16">
        <Suspense fallback={<div className="h-[76px] w-full max-w-2xl mx-auto rounded-full bg-bg-secondary/50 animate-pulse border border-gray-800" />}>
          <SearchBar placeholder="Search characters, episodes, arcs..." />
        </Suspense>
      </div>

      {anime && (
        <section className="mt-20">
          <div className="bg-bg-secondary/60 backdrop-blur-md rounded-3xl p-8 border border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Episodes</p>
              <p className="text-3xl font-black text-white">{currentEpisodes}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Status</p>
              <p className="text-3xl font-black text-accent-gold">{anime.status}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Score</p>
              <p className="text-3xl font-black text-white">{anime.score} / 10</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Rank</p>
              <p className="text-3xl font-black text-white">#{anime.rank}</p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-20">
        <Countdown
          targetDate={nextReleaseISO}
          type="Episode"
          number={nextEpisodeNum}
        />
      </section>

      <section className="mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">Featured Characters</h2>
          <Link href="/characters" className="flex items-center gap-2 text-accent-gold hover:text-yellow-300 transition-colors font-medium">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCharacters.map((char, idx) => (
            <CharacterCard key={char.character.mal_id} character={char} index={idx} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">Latest Episodes</h2>
          <Link href="/episodes" className="flex items-center gap-2 text-accent-gold hover:text-yellow-300 transition-colors font-medium">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestEpisodes.map((ep, idx) => (
            <EpisodeCard key={ep.mal_id} episode={ep} index={idx} featured={idx === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
