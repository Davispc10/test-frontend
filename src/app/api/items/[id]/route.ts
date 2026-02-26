import { NextRequest, NextResponse } from "next/server";
import { getItemDetails } from "@/lib/pokemon-api";

export const revalidate = 3600;

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    try {
        const data = await getItemDetails(id);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching item details in API route:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch item details" },
            { status: 500 }
        );
    }
}
