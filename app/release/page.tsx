import { getAnimeInfo } from "@/lib/api";
import CountdownTimer from "@/components/CountdownTimer";

export async function generateMetadata() {
    return {
        title: "Release Tracker | One Piece Universe",
        description: "Track the latest episode releases of the One Piece anime.",
    };
}

export default async function Release() {
    const anime = await getAnimeInfo();

    return (
        <div className="min-h-screen text-white pt-10 flex flex-col items-center justify-center -mt-20">
            <div className="text-center relative">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[#FFD700]/10 blur-[120px] rounded-full z-0" />

                <div className="relative z-10 glass p-12 md:p-20 rounded-[3rem] border border-[#FFD700]/20 shadow-[0_0_50px_rgba(255,215,0,0.15)] glow-hover">
                    <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#FFD700] drop-shadow-lg">
                        Release Tracker
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl uppercase tracking-widest font-bold mb-4">Latest Episode Reached</p>

                    <div className="text-7xl md:text-9xl font-bold text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] mb-8">
                        {anime.episodes || "1155"}
                    </div>

                    <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#FFD700]/10 rounded-full border border-[#FFD700]/30 text-[#FFD700] text-sm md:text-base font-bold tracking-wider mb-12">
                        <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></div>
                        On Hiatus (Returns April 2026)
                    </div>

                    <div className="pt-10 border-t border-white/10 w-full">
                        <h2 className="text-xl text-gray-400 uppercase tracking-widest font-bold mb-6">Elbaph Arc Countdown</h2>
                        <CountdownTimer />
                    </div>
                </div>
            </div>
        </div>
    );
}
