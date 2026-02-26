import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/pokemon-api";

export const revalidate = 3600; // Cache de itens por 1 hora

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const offset = searchParams.get("offset") || "0";
    const limit = searchParams.get("limit") || "20";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    try {
        const data = await getItems(
            parseInt(limit),
            parseInt(offset),
            search,
            category
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching items in API route:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch items" },
            { status: 500 }
        );
    }
}
