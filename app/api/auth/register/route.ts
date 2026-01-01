import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user exists
        // Note: Drizzle syntax might vary slightly depending on version, 
        // but this is standard for recent versions.
        const existingUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const [newUser] = await db.insert(users).values({
            email,
            password: hashedPassword,
            name,
            role: 'staff', // Default role
        }).returning();

        // Log them in immediately
        await login({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            name: newUser.name,
        });

        return NextResponse.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
    } catch (error) {
        console.error("Registration error:", error);
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
