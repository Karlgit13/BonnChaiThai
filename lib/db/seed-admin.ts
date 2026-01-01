import { db } from './client';
import { users, bookings } from './schema';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { subDays, format, addDays } from 'date-fns';

async function seed() {
    console.log('🌱 Seeding Admin and Mock Data...');

    try {
        // 1. Create Admin User
        const hashedPassword = await bcrypt.hash('adminadmin', 10);
        await db.insert(users).values({
            email: 'admin@admin.se',
            password: hashedPassword,
            name: 'Restaurang Chef',
            role: 'admin',
        }).onConflictDoNothing();

        console.log('✅ Admin user created (or already exists)');

        // 2. Clear existing mock bookings if needed (optional)
        // await db.delete(bookings);

        // 3. Create Mock Bookings for Statistics
        const mockBookings = [];
        const today = new Date();

        // Past bookings (for stats)
        for (let i = 1; i <= 20; i++) {
            const date = subDays(today, Math.floor(Math.random() * 30));
            mockBookings.push({
                date: format(date, 'yyyy-MM-dd'),
                timeSlot: ["17:00", "18:00", "19:00", "20:00"][Math.floor(Math.random() * 4)],
                partySize: Math.floor(Math.random() * 6) + 1,
                customerName: `Kund ${i}`,
                customerEmail: `kund${i}@example.com`,
                customerPhone: `070-${Math.floor(1000000 + Math.random() * 9000000)}`,
                status: 'completed',
                cancellationCode: nanoid(10),
                createdAt: date,
            });
        }

        // Upcoming bookings
        for (let i = 1; i <= 10; i++) {
            const date = addDays(today, Math.floor(Math.random() * 14) + 32); // Bookings after blackout
            mockBookings.push({
                date: format(date, 'yyyy-MM-dd'),
                timeSlot: ["18:00", "19:00", "20:00"][Math.floor(Math.random() * 3)],
                partySize: Math.floor(Math.random() * 4) + 2,
                customerName: `Framtida Gäst ${i}`,
                customerEmail: `gast${i}@example.com`,
                customerPhone: `076-${Math.floor(1000000 + Math.random() * 9000000)}`,
                status: 'confirmed',
                cancellationCode: nanoid(10),
                createdAt: today,
            });
        }

        for (const b of mockBookings) {
            await db.insert(bookings).values(b);
        }

        console.log(`✅ Seeded ${mockBookings.length} mock bookings`);

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        process.exit(0);
    }
}

seed();
