import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { staff } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Hämta all personal
 *     description: Returnerar en lista på all personal. Kräver inloggning.
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Personal hämtad
 *       401:
 *         description: Obehörig
 */
export async function GET() {
    // Public endpoint for viewing staff
    // Removed auth check to allow public website visitors to see the staff list
    try {
        const staffMembers = await db.select().from(staff).orderBy(asc(staff.order));
        return NextResponse.json(staffMembers);
    } catch (error) {
        console.error('Error fetching staff:', error);
        return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
    }
}
