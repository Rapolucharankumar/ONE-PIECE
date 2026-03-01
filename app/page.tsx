import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import CharacterCard from "@/components/CharacterCard";
import EpisodeCard from "@/components/EpisodeCard";
import Countdown from "@/components/Countdown";
import { getCharacters, getEpisodes, getReleaseInfo } from "@/lib/queries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const [characters, episodes, releaseInfo] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getReleaseInfo(),
  ]);

  const featuredCharacters = characters?.slice(0, 4) || [];
  const latestEpisodes = episodes?.slice(0, 4) || [];

  return (
    <div className="pb-24">
      <Hero />

      <div className="mt-16">
        <Suspense fallback={<div className="h-[76px] w-full max-w-2xl mx-auto rounded-full bg-bg-secondary/50 animate-pulse border border-gray-800" />}>
          <SearchBar placeholder="Search characters, episodes, arcs..." />
        </Suspense>
      </div>

      {releaseInfo?.next_episode_date && (
        <section className="mt-20">
          <Countdown
            targetDate={releaseInfo.next_episode_date}
            type="Episode"
            number={releaseInfo.next_episode || 0}
          />
        </section>
      )}

      <section className="mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">Featured Characters</h2>
          <Link href="/characters" className="flex items-center gap-2 text-accent-gold hover:text-yellow-300 transition-colors font-medium">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCharacters.map((char, idx) => (
            <CharacterCard key={char.id} character={char as any} index={idx} />
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
            <EpisodeCard key={ep.number} episode={ep as any} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
