import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Add paths that require authentication here
const protectedPaths = ["/admin", "/dashboard", "/staff"];
const adminOnlyPaths = ["/admin"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is protected
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));
    if (!isProtected) return NextResponse.next();

    const session = request.cookies.get("session")?.value;

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const parsed = await decrypt(session);
        const userRole = parsed.user.role;

        // Admin only check
        if (adminOnlyPaths.some(path => pathname.startsWith(path)) && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/staff/:path*"],
};
