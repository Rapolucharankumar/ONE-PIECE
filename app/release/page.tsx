import { getReleaseInfo } from "@/lib/queries";
import Countdown from "@/components/Countdown";

export default async function ReleasePage() {
    const info = await getReleaseInfo();

    return (
        <div className="py-20 max-w-5xl mx-auto min-h-[70vh]">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                    Release <span className="text-accent-gold">Schedule</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Track the upcoming journeys of the Straw Hat crew. Times shown in your local time zone.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {info?.next_episode_date && (
                    <Countdown
                        targetDate={info.next_episode_date}
                        type="Episode"
                        number={info.next_episode || 0}
                    />
                )}

                {info?.next_chapter_date && (
                    <Countdown
                        targetDate={info.next_chapter_date}
                        type="Chapter"
                        number={info.next_chapter || 0}
                    />
                )}

                {!info?.next_episode_date && !info?.next_chapter_date && (
                    <div className="text-center text-gray-400 py-20 bg-bg-secondary rounded-3xl border border-gray-800">
                        <p className="text-2xl font-bold">No upcoming releases scheduled.</p>
                        <p className="mt-2 text-sm">Check back later for updates on Oda&apos;s breaks or anime schedules.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
