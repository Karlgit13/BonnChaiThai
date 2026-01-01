import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Database schema will be defined here
// This is a placeholder for now

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    role: text('role').notNull().default('customer'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const menuCategories = pgTable('menu_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    nameEn: text('name_en').notNull(),
    description: text('description'),
    order: integer('order').notNull(),
});

export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id').notNull(),
    name: text('name').notNull(),
    nameEn: text('name_en').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    image: text('image'),
    spiceLevel: integer('spice_level'),
    isVegetarian: boolean('is_vegetarian').default(false),
    isGlutenFree: boolean('is_gluten_free').default(false),
    allergens: text('allergens'),
});

// More tables will be added (bookings, staff, reviews, etc.)
