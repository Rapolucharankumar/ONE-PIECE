import Link from "next/link";
import { getAnimeInfo } from "@/lib/api";
import CountdownTimer from "@/components/CountdownTimer";

export async function generateMetadata() {
  return {
    title: "One Piece Universe | The Ultimate Database",
    description: "Explore characters, episodes, arcs, and release schedules of the One Piece anime in an immersive cinematic experience.",
    openGraph: {
      images: ['/hero-bg.jpg']
    }
  };
}

export default async function Home() {
  const anime = await getAnimeInfo();

  return (
    <div className="min-h-screen text-white w-full -mt-28 relative flex flex-col items-center justify-center">
      {/* Background Hero Map Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent z-10" />
      </div>

      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 mt-32">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(255,215,0,0.3)] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          ONE PIECE<br />
          <span className="text-[#FFD700] text-5xl md:text-7xl">UNIVERSE</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed glass rounded-3xl p-6 border border-white/10 shadow-2xl">
          The ultimate database for finding character lore, episodes, and release details.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
          <div className="glass px-8 py-4 rounded-2xl flex flex-col items-center">
            <span className="text-3xl font-bold text-[#FFD700]">{anime.episodes || "1100+"}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">Total Episodes</span>
          </div>
          <div className="glass px-8 py-4 rounded-2xl flex flex-col items-center">
            <span className="text-3xl font-bold text-white capitalize">{anime.status}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">Current Status</span>
          </div>
          <div className="glass px-8 py-4 rounded-2xl flex flex-col items-center">
            <span className="text-3xl font-bold text-white capitalize">{anime.score} / 10</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">MAL Score</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 relative z-30">
          <h2 className="text-xl font-serif text-white tracking-widest uppercase mb-2 drop-shadow-md">
            Next Episode Airs In
          </h2>
          <CountdownTimer />
        </div>

        <div className="mt-16 flex gap-6 justify-center">
          <Link href="/characters" className="px-8 py-4 bg-[#FFD700] text-[#0f0f1a] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)]">
            Explore Characters
          </Link>
          <Link href="/episodes" className="px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
            View Episodes
          </Link>
        </div>
      </div>
    </div>
  );
}
