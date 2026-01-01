import { pgTable, serial, text, timestamp, integer, boolean, date } from 'drizzle-orm/pg-core';

// --- AUTH & USERS ---
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    role: text('role').notNull().default('staff'), // staff, admin
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- MENU SYSTEM ---
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(), // t.ex. "Förrätter"
    nameEn: text('name_en').notNull(), // t.ex. "Appetizers"
    description: text('description'),
    order: integer('order').notNull().default(0),
});

export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id').references(() => categories.id),
    name: text('name').notNull(),
    nameEn: text('name_en').notNull(),
    description: text('description').notNull(),
    descriptionEn: text('description_en'),
    price: integer('price').notNull(),
    image: text('image'),
    spiceLevel: integer('spice_level').default(0), // 0-3 chili
    isVegetarian: boolean('is_vegetarian').default(false),
    isVegan: boolean('is_vegan').default(false),
    isGlutenFree: boolean('is_gluten_free').default(false),
    allergens: text('allergens'), // Kommaseparerad lista eller JSON
    isAvailable: boolean('is_available').default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- BOOKING SYSTEM ---
export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    timeSlot: text('time_slot').notNull(), // t.ex. "18:00"
    partySize: integer('party_size').notNull(),
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    customerPhone: text('customer_phone').notNull(),
    status: text('status').notNull().default('pending'), // pending, confirmed, cancelled, seated, completed
    notes: text('notes'),
    cancellationCode: text('cancellation_code').notNull(), // För att gästen ska kunna boka av själv
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- STAFF & STORY ---
export const staff = pgTable('staff', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(), // t.ex. "Chef", "Owner", "Server"
    roleEn: text('role_en'),
    bio: text('bio').notNull(), // Storyn om personen
    bioEn: text('bio_en'),
    image: text('image'),
    order: integer('order').default(0),
    isFamilyMember: boolean('is_family_member').default(true),
});

// --- REVIEWS ---
export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    rating: integer('rating').notNull(), // 1-5
    comment: text('comment').notNull(),
    visitDate: date('visit_date'),
    isVerified: boolean('is_verified').default(false),
    isDisplayed: boolean('is_displayed').default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- RESTAURANT SETTINGS ---
export const restaurantInfo = pgTable('restaurant_info', {
    id: serial('id').primaryKey(),
    key: text('key').notNull().unique(), // t.ex. "opening_hours", "address", "phone"
    value: text('value').notNull(),
    description: text('description'),
});
