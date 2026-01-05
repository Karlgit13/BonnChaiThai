import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Add paths that require authentication here
const protectedPaths = ["/admin", "/dashboard", "/staff"];
const adminOnlyPaths = ["/admin"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is protected
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));
    if (!isProtected) return NextResponse.next();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const userRole = (payload as { role?: unknown }).role;

        // Admin only check
        if (adminOnlyPaths.some(path => pathname.startsWith(path)) && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/staff/:path*"],
};
