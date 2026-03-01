export interface Episode {
    number: number;
    title?: string | null;
    arc?: string | null;
    release_date?: string | null;
    is_filler?: boolean;
    manga_adaptation?: number | null;
    summary?: string | null;
}
