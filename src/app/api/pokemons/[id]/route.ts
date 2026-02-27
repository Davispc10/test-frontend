import { NextRequest, NextResponse } from "next/server";
import { getPokemonDetails } from "@/lib/pokemon-api";

export const revalidate = 30; // Caching for 30 seconds

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const data = await getPokemonDetails(resolvedParams.id);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error(`Error fetching proxy pokemon details:`, error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch pokemon details" },
            { status: 500 }
        );
    }
}
