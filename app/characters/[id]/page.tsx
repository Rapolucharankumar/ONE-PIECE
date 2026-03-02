import { getCharacter } from "@/lib/api";

export default async function CharacterDetail({
    params,
}: {
    params: { id: string };
}) {
    const character = await getCharacter(params.id);

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white px-20 py-20">
            <div className="flex gap-12">
                <img
                    src={character.images.jpg.image_url}
                    className="rounded-xl w-[400px]"
                />

                <div>
                    <h1 className="text-6xl font-bold mb-6">
                        {character.name}
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        {character.about}
                    </p>
                </div>
            </div>
        </div>
    );
}
