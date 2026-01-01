import { db } from "@/lib/db";
import { categories, menuItems } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allCategories = await db.query.categories.findMany({
            with: {
                // items: true // This requires relations to be defined in schema.ts
            },
            orderBy: (categories, { asc }) => [asc(categories.order)],
        });

        // Since relations aren't explicitly defined with relations() in schema yet, 
        // we fetch items separately and group them
        const items = await db.query.menuItems.findMany({
            where: (items, { eq }) => eq(items.isAvailable, true),
        });

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
