import { getEpisodes } from "@/lib/api";

export default async function Episodes() {
    const episodes = await getEpisodes(1);

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white px-20 py-20">
            <h1 className="text-6xl font-bold mb-12">Episodes</h1>

            <div className="space-y-6">
                {episodes?.map((ep: any) => (
                    <div
                        key={ep.mal_id}
                        className="bg-[#1a1a2e] p-6 rounded-xl"
                    >
                        <h2 className="text-xl font-semibold">
                            Episode {ep.mal_id}: {ep.title}
                        </h2>
                        <p className="text-gray-400">{ep.aired}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
