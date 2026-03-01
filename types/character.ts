export interface Character {
    id: string;
    name: string;
    slug: string;
    bounty?: number | null;
    crew?: string | null;
    devil_fruit?: string | null;
    haki?: string[] | null;
    first_episode?: number | null;
    first_chapter?: number | null;
    status?: string | null;
    image_url?: string | null;
    story?: any | null;
}
