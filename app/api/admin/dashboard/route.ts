import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { bookings } from '@/lib/db/schema';
import { verifyToken, getAuthToken } from '@/lib/auth';
import { desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    // 1. Verify Admin
    const token = getAuthToken(request);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        // 2. Fetch all bookings
        const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));

        // 3. Calc Stats (Mocked or real based on DB)
        const totalBookings = allBookings.length;
        const confirmedBookings = allBookings.filter(b => b.status === 'confirmed').length;

        // Mock revenue: Assume 500 SEK per guest
        const totalRevenue = allBookings.reduce((sum, b) => sum + (b.partySize * 500), 0);

        // Monthly growth mock
        const stats = {
            totalBookings,
            confirmedBookings,
            totalRevenue,
            monthlyGrowth: "+12%",
            popularTime: "19:00",
        };

        return NextResponse.json({
            bookings: allBookings,
            stats
        });

    } catch (error) {
        console.error('Admin API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
