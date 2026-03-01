import { supabase } from "./supabase";
import { cache } from "react";

// Cache database queries to prevent duplicate fetching during React rendering passes
// and add ISR revalidation (revalidate every 3600 seconds = 1 hour) by default where applicable

export const getCharacters = cache(async () => {
    const { data } = await supabase.from("characters").select("*");
    return data;
});

export const getCharacter = cache(async (slug: string) => {
    const { data } = await supabase
        .from("characters")
        .select("*")
        .eq("slug", slug)
        .single();
    return data;
});

export const getEpisodes = cache(async () => {
    const { data } = await supabase.from("episodes").select("*").order("number", { ascending: false });
    return data;
});

export const getEpisode = cache(async (number: number) => {
    const { data } = await supabase.from("episodes").select("*").eq("number", number).single();
    return data;
});

export const getReleaseInfo = cache(async () => {
    const { data } = await supabase.from("release_info").select("*").eq("id", 1).single();
    return data;
});
