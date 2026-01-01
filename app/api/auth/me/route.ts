import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getAuthToken } from '@/lib/auth';

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
