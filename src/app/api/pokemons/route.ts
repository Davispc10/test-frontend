import { NextRequest, NextResponse } from "next/server";
import { getPokemons } from "@/lib/pokemon-api";

export const revalidate = 30; // Caching for 30 seconds

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const offset = searchParams.get("offset") || "0";
    const limit = searchParams.get("limit") || "20";
    const search = searchParams.get("search") || "";
    const types = searchParams.get("types")?.split(",") || [];
    const minId = searchParams.get("minId");
    const maxId = searchParams.get("maxId");
    const rarity = searchParams.get("rarity") as "legendary" | "mythical" | "ultrabeast" | null;

    try {
        const data = await getPokemons(
            parseInt(limit),
            parseInt(offset),
            search,
            minId ? parseInt(minId) : undefined,
            maxId ? parseInt(maxId) : undefined,
            types.length > 0 ? types : undefined,
            rarity
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching Pokemons in API route:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch pokemons" },
            { status: 500 }
        );
    }
}
