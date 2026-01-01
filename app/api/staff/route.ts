import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { staff } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get all staff members
 *     description: Returns a list of all staff members suited for the "Personal" page.
 *     responses:
 *       200:
 *         description: Successfully retrieved staff members
 */
export async function GET() {
    try {
        const staffMembers = await db.select().from(staff).orderBy(asc(staff.order));
        return NextResponse.json(staffMembers);
    } catch (error) {
        console.error('Error fetching staff:', error);
        return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
    }
}
