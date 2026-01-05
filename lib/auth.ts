import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-dev-only');

export async function signToken(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch {
        return null;
    }
}

export const decrypt = verifyToken;
export const encrypt = signToken;

export function getAuthToken(req: NextRequest) {
    return req.cookies.get('token')?.value;
}

// Compat helper for existing route logic
export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload) return null;
    // Return wrapped in user to match existing attentes if needed, 
    // or just the payload. Existing code expects .user.role
    return { user: payload };
}
