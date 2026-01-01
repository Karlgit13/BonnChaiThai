import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { nanoid } from "nanoid";

// Create a booking (Public)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, timeSlot, partySize, customerName, customerEmail, customerPhone, notes } = body;

        if (!date || !timeSlot || !partySize || !customerName || !customerEmail || !customerPhone) {
            return NextResponse.json({ error: "Saknar nödvändiga fält" }, { status: 400 });
        }

        const cancellationCode = nanoid(10).toUpperCase();

        const [newBooking] = await db.insert(bookings).values({
            date,
            timeSlot,
            partySize: parseInt(partySize),
            customerName,
            customerEmail,
            customerPhone,
            notes,
            cancellationCode,
            status: 'pending'
        }).returning();

        return NextResponse.json({ success: true, booking: newBooking });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// Get all bookings (Protected - Staff/Admin)
export async function GET() {
    const session = await getSession();
    if (!session || (session.user.role !== 'staff' && session.user.role !== 'admin')) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const allBookings = await db.query.bookings.findMany({
            orderBy: (bookings, { desc }) => [desc(bookings.date)],
        });
        return NextResponse.json(allBookings);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
