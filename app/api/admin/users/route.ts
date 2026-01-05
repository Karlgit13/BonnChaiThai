import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { verifyToken, getAuthToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Hämta alla användare (Admin endast)
 *     description: Hämtar en lista på alla registrerade användare. Kräver Admin-token.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista på användare
 */
export async function GET(request: NextRequest) {
    const token = getAuthToken(request);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const allUsers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            createdAt: users.createdAt
        })
            .from(users)
            .orderBy(desc(users.createdAt));

        return NextResponse.json(allUsers);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
