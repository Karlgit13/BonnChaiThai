import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allStaff = await db.query.staff.findMany({
            orderBy: (staff, { asc }) => [asc(staff.order)],
        });
        return NextResponse.json(allStaff);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
