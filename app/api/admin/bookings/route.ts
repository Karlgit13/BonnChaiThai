import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { bookings } from '@/lib/db/schema';
import { verifyToken, getAuthToken } from '@/lib/auth';
import { desc, ilike, or, and, eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: Sök och hämta alla bokningar (Admin endast)
 *     description: Hämtar bokningar med filtrering på namn, e-post eller datum. Kräver Admin-token.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Sökterm för namn eller e-post
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrera på specifikt datum (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista på bokningar
 *       401:
 *         description: Obehörig
 *       403:
 *         description: Förbjudet (Ej admin)
 */
export async function GET(request: NextRequest) {
    const token = getAuthToken(request);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const date = searchParams.get('date');

    try {
        let query = db.select().from(bookings);
        const conditions = [];

        if (search) {
            conditions.push(or(
                ilike(bookings.customerName, `%${search}%`),
                ilike(bookings.customerEmail, `%${search}%`)
            ));
        }

        if (date) {
            conditions.push(eq(bookings.date, date));
        }

        const results = await db.select()
            .from(bookings)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(desc(bookings.createdAt));

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
