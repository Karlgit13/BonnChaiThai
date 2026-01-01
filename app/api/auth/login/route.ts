import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password, isBankID } = await request.json();

        // Mock BankID Logic
        if (isBankID) {
            // In a real app, we'd verify the BankID signature here
            // For this mock, we'll just log in a default guest or the first user found or return a specific mock user
            return NextResponse.json({
                message: 'BankID Login Simulated',
                user: { name: "BankID Gäst", email: "bankid@example.com", role: "staff" }
            });
        }

        if (!email || !password) {
            return NextResponse.json({ error: 'E-post och lösenord krävs' }, { status: 400 });
        }

        const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
        const user = result[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Felaktiga inloggningsuppgifter' }, { status: 401 });
        }

        const token = await signToken({ id: user.id, email: user.email, name: user.name, role: user.role });

        const response = NextResponse.json({
            user: { name: user.name, email: user.email, role: user.role }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internt serverfel' }, { status: 500 });
    }
}
