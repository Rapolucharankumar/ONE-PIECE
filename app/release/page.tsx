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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-bold mb-2">Latest Episode Reached</p>
                            <div className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                {anime.episodes || "1155"}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-bold mb-2">Next Episode</p>
                            <div className="text-5xl md:text-7xl font-bold text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                                1156
                            </div>
                        </div>
                    </div>

                    <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#FFD700]/10 rounded-full border border-[#FFD700]/30 text-[#FFD700] text-sm md:text-base font-bold tracking-wider mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></div>
                        On Hiatus (Returns April 2026)
                    </div>

                    <p className="text-gray-400 text-sm italic mb-12 max-w-xl mx-auto">
                        * Note: One Piece traditionally airs weekly on Sundays at 9:30 AM (Japan Standard Time).
                        The anime is currently on a production break following the Egghead Arc.
                    </p>

                    <div className="pt-10 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f0f1a] px-6 text-[#FFD700] font-bold tracking-widest uppercase text-sm border border-white/10 rounded-full py-1">
                            Elbaph Arc Countdown
                        </div>
                        <CountdownTimer />
                    </div>
                </div>
            </div>
        </div>
    );
}
