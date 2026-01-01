import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session || (session.user.role !== 'staff' && session.user.role !== 'admin')) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { status } = await req.json();
        const { id } = await params;
        const bookingId = parseInt(id);

        const [updated] = await db.update(bookings)
            .set({ status })
            .where(eq(bookings.id, bookingId))
            .returning();

        return NextResponse.json(updated);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
