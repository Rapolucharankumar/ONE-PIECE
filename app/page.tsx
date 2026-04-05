import Link from "next/link";
import { getAnimeInfo, getLiveEpisodesAndArc } from "@/lib/api";
import CountdownTimer from "@/components/CountdownTimer";
import { FadeIn, StaggerContainer, StaggerItem, MagneticButton, FloatingElement } from "@/components/MotionComponents";
import AnimatedCounter from "@/components/AnimatedCounter";

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
  // Fetch dynamic episode and arc data from AniList
  const liveStats = await getLiveEpisodesAndArc();

  return (
    <div className="min-h-screen text-white w-full -mt-28 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Hero Map Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent z-10" />
      </div>

      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 mt-32 w-full">
        <StaggerContainer className="flex flex-col items-center w-full">
            <StaggerItem>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(255,215,0,0.3)] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 select-none">
                ONE PIECE<br />
                <span className="text-[#FFD700] text-5xl md:text-7xl">UNIVERSE</span>
                </h1>
            </StaggerItem>

            <StaggerItem>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed glass rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-xl transition-all hover:bg-white/5 hover:border-white/20">
                The ultimate database for finding character lore, episodes, and release details. 
                </p>
            </StaggerItem>

            <StaggerItem className="w-full">
                <div className="flex flex-wrap items-center justify-center gap-6 text-lg w-full">
                    <FloatingElement delay={0}>
                        <div className="glass px-8 py-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl w-64 hover:border-[#FFD700]/50 transition-colors group">
                            <span className="text-4xl font-bold text-[#FFD700] group-hover:scale-110 transition-transform">
                                <AnimatedCounter to={liveStats.episodes} duration={2.5} />
                            </span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-2 font-semibold">Total Episodes</span>
                        </div>
                    </FloatingElement>
                    
                    <FloatingElement delay={0.2}>
                        <div className="glass px-8 py-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl w-64 hover:border-white/50 transition-colors group">
                            <span className="text-3xl font-bold text-white capitalize group-hover:scale-110 transition-transform">
                                {liveStats.currentArc}
                            </span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-2 font-semibold">Current Arc</span>
                        </div>
                    </FloatingElement>

                    <FloatingElement delay={0.4}>
                        <div className="glass px-8 py-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl w-64 hover:border-white/50 transition-colors group">
                            <span className="text-4xl font-bold text-white capitalize group-hover:scale-110 transition-transform flex items-center gap-1">
                                <AnimatedCounter to={anime?.score || "8.7"} duration={2.5} />
                                <span className="text-xl text-gray-400">/10</span>
                            </span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-2 font-semibold">MAL Score</span>
                        </div>
                    </FloatingElement>
                </div>
            </StaggerItem>
        </StaggerContainer>

        <FadeIn y={50} delay={0.6} className="mt-20 flex flex-col items-center gap-6 relative z-30">
          <div className="glass border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-gradient-to-b from-white/5 to-transparent">
            <h2 className="text-xl font-serif text-[#FFD700] tracking-widest uppercase mb-4 drop-shadow-md text-center">
                Returns April 2026 (Elbaph Arc)
            </h2>
            <CountdownTimer />
          </div>
        </FadeIn>

        <FadeIn delay={0.8} y={30} className="mt-16 flex gap-8 justify-center pb-20">
          <Link href="/characters">
            <MagneticButton className="px-10 py-5 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-[#0f0f1a] rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)]">
                Explore Characters
            </MagneticButton>
          </Link>
          <Link href="/episodes">
            <MagneticButton className="px-10 py-5 bg-white/5 text-white backdrop-blur-xl rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/20 hover:border-white/40">
                View Episodes
            </MagneticButton>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
