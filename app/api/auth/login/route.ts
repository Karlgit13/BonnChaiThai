import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        await login({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        });

        return NextResponse.json({
            success: true,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error);
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
