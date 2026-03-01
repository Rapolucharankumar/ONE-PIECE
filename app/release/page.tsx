import { getAnimeInfo } from "@/lib/api";
import { getNextSunday } from "@/lib/countdown";
import Countdown from "@/components/Countdown";

export default async function ReleasePage() {
    const anime = await getAnimeInfo();
    const nextReleaseISO = getNextSunday();
    const currentEp = anime?.episodes ? Math.max(anime.episodes, 1155) : 1155;

    return (
        <div className="py-20 max-w-5xl mx-auto min-h-[70vh]">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                    Release <span className="text-accent-gold">Schedule</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Tracking the live broadcast schedule for <span className="text-white font-bold">One Piece</span> directly from MyAnimeList data. Times shown in your local time zone.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                <Countdown
                    targetDate={nextReleaseISO}
                    type="Episode"
                    number={currentEp + 1}
                />

                <div className="mt-8 text-center bg-bg-secondary/50 rounded-3xl p-8 border border-gray-800">
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">Weekly Broadcast</h3>
                    <p className="text-gray-400">One Piece airs weekly on Sunday mornings (JST) on Fuji TV.</p>

                    <p className="text-yellow-400 font-bold mt-4 px-4 py-2 bg-yellow-900/40 rounded-lg inline-block border border-yellow-900/50">
                        Note: The anime is currently on a hiatus after the Egghead Island Arc (Episode 1155).
                        <br />The journey continues with the Elbaph Arc in April 2026.
                    </p>

                    {anime?.status === "Finished Airing" && (
                        <p className="text-red-400 font-bold mt-4 px-4 py-2 bg-red-900/40 rounded-lg inline-block">
                            Note: The anime has concluded its broadcast.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
