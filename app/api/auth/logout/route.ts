import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logga ut användare
 *     description: Rensar session-cookien.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Utloggning lyckades
 */

export async function POST() {
    const response = NextResponse.json({ message: 'Utloggad' });
    response.cookies.set('token', '', { maxAge: 0 });
    return response;
}
