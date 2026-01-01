import { db } from './client';
import { users } from './schema';
import { hash } from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedAdmin() {
    console.log('🌱 Seedar Admin...');

    const adminEmail = 'admin@bonnchaitthai.se';
    const adminPassword = 'AdminPassword123!'; // Change this in production

    try {
        const hashedPassword = await hash(adminPassword, 10);

        await db.insert(users).values({
            email: adminEmail,
            password: hashedPassword,
            name: 'Huvudadmin',
            role: 'admin',
        }).onConflictDoUpdate({
            target: users.email,
            set: {
                password: hashedPassword,
                role: 'admin'
            }
        });

        console.log('✅ Admin seedad!');
        console.log('E-post:', adminEmail);
        console.log('Lösenord:', adminPassword);
    } catch (error) {
        console.error('❌ Fel vid seeding:', error);
    }
}

seedAdmin();
