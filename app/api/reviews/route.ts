import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { verifyToken, getAuthToken } from "@/lib/auth";

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Hämta alla recensioner
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista på recensioner
 *   post:
 *     summary: Lämna en recension
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recension postad
 *       401:
 *         description: Obehörig
 */

export async function GET() {
    try {
        const allReviews = await db.query.reviews.findMany({
            where: (reviews, { eq }) => eq(reviews.isDisplayed, true),
            orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
        });
        return NextResponse.json(allReviews);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const token = getAuthToken(req as any);
    if (!token) return NextResponse.json({ error: "Obehörig. Logga in för att lämna recension." }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Obehörig" }, { status: 401 });

    try {
        const { customerName, rating, comment } = await req.json();

        if (!customerName || !rating || !comment) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const [newReview] = await db.insert(reviews).values({
            customerName,
            rating: parseInt(rating),
            comment,
            isDisplayed: true // Default to true or false for moderation
        }).returning();

        return NextResponse.json(newReview);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
