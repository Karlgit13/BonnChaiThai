import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrera en ny användare
 *     description: Skapa ett nytt personal- eller kundkonto.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrering lyckades
 *       400:
 *         description: Felaktig indata eller användaren finns redan
 */
export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Alla fält måste fyllas i' }, { status: 400 });
        }

        // Check if user exists
        const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (existing.length > 0) {
            return NextResponse.json({ error: 'E-postadressen används redan' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: 'staff' // Default role
        }).returning();

        const user = result[0];
        const token = await signToken({ id: user.id, email: user.email, name: user.name, role: user.role });

        const response = NextResponse.json({
            message: 'Registrering lyckades',
            user: { name: user.name, email: user.email, role: user.role }
        }, { status: 201 });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internt serverfel' }, { status: 500 });
    }
}
