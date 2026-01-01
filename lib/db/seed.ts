import { db } from './client';
import * as schema from './schema';
import { nanoid } from 'nanoid';

async function main() {
    console.log('🌱 Deleting existing data...');
    // Delete in order to respect foreign keys if any
    await db.delete(schema.menuItems);
    await db.delete(schema.categories);
    await db.delete(schema.staff);
    await db.delete(schema.reviews);

    console.log('🍱 Seeding categories...');
    const catResults = await db.insert(schema.categories).values([
        { name: 'Förrätter', nameEn: 'Appetizers', order: 1, description: 'Små rätter att starta med' },
        { name: 'CurryRätter', nameEn: 'Curries', order: 2, description: 'Klassiska thailändska curryrätter' },
        { name: 'Wokat', nameEn: 'Stir-fry', order: 3, description: 'Från wokpannan' },
        { name: 'Nudlar & Ris', nameEn: 'Noodles & Rice', order: 4, description: 'Mättande klassiker' },
    ]).returning();

    const appetizersId = catResults.find(c => c.nameEn === 'Appetizers')?.id;
    const curriesId = catResults.find(c => c.nameEn === 'Curries')?.id;

    if (appetizersId && curriesId) {
        console.log('🍛 Seeding menu items...');
        await db.insert(schema.menuItems).values([
            {
                categoryId: appetizersId,
                name: 'Vårrullar',
                nameEn: 'Spring Rolls',
                description: 'Hemgjorda vegetariska vårrullar med sötsur sås.',
                descriptionEn: 'Homemade vegetarian spring rolls with sweet and sour sauce.',
                price: 85,
                spiceLevel: 0,
                isVegetarian: true,
            },
            {
                categoryId: curriesId,
                name: 'Gaeng Keow Wan',
                nameEn: 'Green Curry',
                description: 'Grön curry med kokosmjölk, bambuskott och basilika.',
                descriptionEn: 'Green curry with coconut milk, bamboo shoots and basil.',
                price: 185,
                spiceLevel: 2,
                isGlutenFree: true,
            }
        ]);
    }

    console.log('👨‍👩‍👧‍👦 Seeding staff...');
    await db.insert(schema.staff).values([
        {
            name: 'Somchai Bonn',
            role: 'Grundare & Köksmästare',
            roleEn: 'Founder & Head Chef',
            bio: 'Somchai flyttade till Stockholm 1995 och har sedan dess drömt om att öppna stadens bästa Thai-restaurang.',
            isFamilyMember: true,
        }
    ]);

    console.log('✅ Seeding complete!');
}

main().catch((err) => {
    console.error('❌ Seeding failed!');
    console.error(err);
    process.exit(1);
});
