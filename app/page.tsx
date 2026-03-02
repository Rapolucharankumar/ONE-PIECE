import { getAnimeInfo } from "@/lib/api";

export default async function Home() {
  const anime = await getAnimeInfo();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white px-20 py-20">
      <h1 className="text-7xl font-bold mb-10">
        One Piece Universe
      </h1>

      <div className="text-4xl space-y-4">
        <p>Total Episodes: {anime.episodes}</p>
        <p>Status: {anime.status}</p>
      </div>
    </div>
  );
}
