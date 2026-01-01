import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getAuthToken } from '@/lib/auth';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Hämta aktuell inloggad användare
 *     description: Verifierar sessionen och returnerar användardata.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Användardata returnerad
 */
export async function GET(request: NextRequest) {
    const token = getAuthToken(request);

    if (!token) {
        return NextResponse.json({ user: null });
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: payload });
}
