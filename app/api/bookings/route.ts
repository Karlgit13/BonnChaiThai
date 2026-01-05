import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db/client';
import { bookings } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { addWeeks, isAfter, isBefore, startOfDay, parseISO } from 'date-fns';
import { verifyToken, getAuthToken } from '@/lib/auth';

const MAX_WEEKS_AHEAD = 8;
const SEATS_PER_SLOT = 20; // Simplified capacity per slot
const TIME_SLOTS = [
    "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30"
];

// User requested blackout period for rebranding/exclusivity
const FULLY_BOOKED_UNTIL = '2026-02-01';

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Kontrollera tillgängliga tider
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Datum att kontrollera (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista på tider och tillgänglighet
 *       401:
 *         description: Obehörig
 *   post:
 *     summary: Skapa en ny bordsbokning
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - timeSlot
 *               - partySize
 *               - customerName
 *               - customerEmail
 *               - customerPhone
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               timeSlot:
 *                 type: string
 *               partySize:
 *                 type: integer
 *               customerName:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bokning bekräftad
 *       400:
 *         description: Felaktig indata eller fullbokat
 *       401:
 *         description: Obehörig
 */

export async function GET(request: Request) {
    // NOTE: No authentication required to VIEW available slots

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
        return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const date = new Date(dateParam);

    // Validate 4 weeks logic
    const today = startOfDay(new Date());
    const maxDate = addWeeks(today, MAX_WEEKS_AHEAD);

    // Check if within blackout period
    if (dateParam <= FULLY_BOOKED_UNTIL) {
        const fullyBookedResponse = TIME_SLOTS.map(slot => ({
            time: slot,
            availableSeats: 0,
            isAvailable: false
        }));
        return NextResponse.json(fullyBookedResponse);
    }

    if (isBefore(date, today) || isAfter(date, maxDate)) {
        return NextResponse.json({ error: 'Date must be within the next 4 weeks' }, { status: 400 });
    }

    try {
        // Fetch existing bookings for this date
        const existingBookings = await db.select({
            timeSlot: bookings.timeSlot,
            partySize: bookings.partySize,
        })
            .from(bookings)
            .where(
                and(
                    eq(bookings.date, dateParam),
                    sql`${bookings.status} != 'cancelled'`
                )
            );

        // Calculate availability
        const availability = TIME_SLOTS.map(slot => {
            const slotBookings = existingBookings.filter(b => b.timeSlot === slot);
            const takenSeats = slotBookings.reduce((sum, b) => sum + b.partySize, 0);
            return {
                time: slot,
                availableSeats: Math.max(0, SEATS_PER_SLOT - takenSeats),
                isAvailable: takenSeats < SEATS_PER_SLOT
            };
        });

        return NextResponse.json(availability);

    } catch (error) {
        console.error('Error checking availability:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = getAuthToken(request);
    if (!token) return NextResponse.json({ error: 'Unauthorized. Logga in för att boka bord.' }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const { date, timeSlot, partySize, customerName, customerEmail, customerPhone, notes } = body;

        // Basic validation
        if (!date || !timeSlot || !partySize || !customerName || !customerEmail || !customerPhone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const bookingDate = new Date(date);
        const today = startOfDay(new Date());
        const maxDate = addWeeks(today, MAX_WEEKS_AHEAD);

        if (isBefore(bookingDate, today)) {
            return NextResponse.json({ error: 'Cannot book in the past' }, { status: 400 });
        }

        if (date <= FULLY_BOOKED_UNTIL) {
            return NextResponse.json({ error: 'Fully booked until 2026-02-01' }, { status: 400 });
        }

        if (isAfter(bookingDate, maxDate)) {
            return NextResponse.json({ error: 'Cannot book more than 4 weeks in advance' }, { status: 400 });
        }

        if (!TIME_SLOTS.includes(timeSlot)) {
            return NextResponse.json({ error: 'Invalid time slot' }, { status: 400 });
        }

        // Check availability strictly
        const existingBookings = await db.select({
            partySize: bookings.partySize,
        })
            .from(bookings)
            .where(
                and(
                    eq(bookings.date, date),
                    eq(bookings.timeSlot, timeSlot),
                    sql`${bookings.status} != 'cancelled'`
                )
            );

        const takenSeats = existingBookings.reduce((sum, b) => sum + b.partySize, 0);

        if (takenSeats + partySize > SEATS_PER_SLOT) {
            return NextResponse.json({ error: 'Not enough seats available' }, { status: 400 });
        }

        // Create booking
        const cancellationCode = nanoid(10);

        await db.insert(bookings).values({
            date: date,
            timeSlot,
            partySize,
            customerName,
            customerEmail,
            customerPhone,
            notes,
            cancellationCode,
            status: 'confirmed'
        });

        return NextResponse.json({
            message: 'Booking confirmed',
            booking: { date, timeSlot, partySize, customerName }
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
