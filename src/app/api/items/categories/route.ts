import { NextRequest, NextResponse } from "next/server";
import { getItemCategories } from "@/lib/pokemon-api";

export const revalidate = 3600;

export async function GET() {
    try {
        const categories = await getItemCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch item categories" },
            { status: 500 }
        );
    }
}
