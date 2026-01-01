import { db } from "@/lib/db";
import { categories, menuItems } from "@/lib/db/schema";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Hämta hela menyn
 *     description: Hämtar alla kategorier och deras tillgängliga rätter.
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menyn hämtad
 */

import { asc, eq } from 'drizzle-orm';

export async function GET() {
    try {
        const allCategories = await db.select()
            .from(categories)
            .orderBy(asc(categories.order));

        const items = await db.select()
            .from(menuItems)
            .where(eq(menuItems.isAvailable, true));

        const menu = allCategories.map(cat => ({
            ...cat,
            items: items.filter(item => item.categoryId === cat.id)
        }));

        return NextResponse.json(menu);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
