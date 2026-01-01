import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { NextResponse } from "next/server";

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
