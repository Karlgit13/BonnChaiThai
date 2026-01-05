import { db } from './client';
import * as schema from './schema';


async function main() {
    console.log('🌱 Deleting existing data...');
    // Delete in order to respect foreign keys if any
    await db.delete(schema.menuItems);
    await db.delete(schema.categories);
    await db.delete(schema.staff);
    await db.delete(schema.reviews);

    console.log('🍱 Seeding categories...');
    const catResults = await db.insert(schema.categories).values([
        { name: 'Förrätter', nameEn: 'Appetizers', order: 1, description: 'Eleganta små rätter att starta din kulinariska resa.' },
        { name: 'Varmrätter', nameEn: 'Main Courses', order: 2, description: 'Våra signaturrätter och klassiker.' },
        { name: 'Efterrätter', nameEn: 'Desserts', order: 3, description: 'En söt avslutning på din kväll.' },
        { name: 'Dryck', nameEn: 'Drinks', order: 4, description: 'Exklusiva viner, öl och cocktails.' },
    ]).returning();

    const catMap = Object.fromEntries(catResults.map(c => [c.name, c.id]));

    console.log('🍛 Seeding menu items...');
    await db.insert(schema.menuItems).values([
        // Förrätter
        { categoryId: catMap['Förrätter'], name: 'Scallops & Betel', nameEn: 'Scallops & Betel', price: 245, description: 'Hälleflundra, kammussla, grön chili, kokosgrädde och betelblad.', image: '/images/scallops-betel.png' },
        { categoryId: catMap['Förrätter'], name: 'Wagyu Tartare', nameEn: 'Wagyu Tartare', price: 325, description: 'Svensk Wagyu, rostad rispuff, kaffir lime, chili och äggula confit.', image: '/images/wagyu-tartare.png' },
        { categoryId: catMap['Förrätter'], name: 'Royal Dumplings', nameEn: 'Royal Dumplings', price: 215, description: 'Hummer och räkor, tryffelolja, svart vinäger och vitlökchips.', image: '/images/royal-dumplings.png' },
        { categoryId: catMap['Förrätter'], name: 'Tom Kha Gai Soup', nameEn: 'Tom Kha Gai Soup', price: 195, description: 'Krämig kokosmjölk, galangal, citrongräs, kyckling från Bjärehalvön.', image: '/images/tom-kha-gai.png' },

        // Varmrätter
        { categoryId: catMap['Varmrätter'], name: 'Wagyu Massaman', nameEn: 'Wagyu Massaman', price: 745, description: 'Långkokt svenskt Wagyu högrev, handmortlad curry, kanderad sötpotatis, rostade pekannötter.', image: '/images/wagyu-massaman.png' },
        { categoryId: catMap['Varmrätter'], name: 'Lobster Pad Thai', nameEn: 'Lobster Pad Thai', price: 595, description: 'Färsk hummer, tamarind-reduktion, risnudlar från Chanthaburi, 24k bladguld.', image: '/images/lobster-pad-thai.png' },
        { categoryId: catMap['Varmrätter'], name: 'Plum Wine Duck', nameEn: 'Plum Wine Duck', price: 625, description: 'Confiterad anka, plommonvin, stjärnanis-pak choi, jasminris.', image: '/images/plum-wine-duck.png' },
        { categoryId: catMap['Varmrätter'], name: 'Crispy Pork Belly', nameEn: 'Crispy Pork Belly', price: 425, description: 'Iberico grissida, holy basil, chili, vitlök och ostronsås.', image: '/images/crispy-pork-belly.png' },
        { categoryId: catMap['Varmrätter'], name: 'Gaeng Keow Wan', nameEn: 'Green Curry', price: 395, description: 'Grön curry, majskyckling, thai-aubergine, sötbasilika och bambuskott.', image: '/images/gaeng-keow-wan.png' },

        // Efterrätter
        { categoryId: catMap['Efterrätter'], name: 'Mango Sticky Rice', nameEn: 'Mango Sticky Rice', price: 185, description: 'Champagne-mango, kokosgrädde, rostade mungbönor, jasminblomma.', image: '/images/mango-sticky-rice.png' },
        { categoryId: catMap['Efterrätter'], name: 'Thai Tea Crème Brûlée', nameEn: 'Thai Tea Crème Brûlée', price: 165, description: 'Klassiskt thai-te, bränd socker, kokosflarn.', image: '/images/Thai Tea Crème Brûlée.png' },

        // Dryck
        { categoryId: catMap['Dryck'], name: 'Château Margaux 2015', nameEn: 'Château Margaux 2015', price: 8500, description: 'Bordeaux, Frankrike. Elegant, strukturerad, perfekt till Wagyu.', image: '/images/Château Margaux 2015.png' },
        { categoryId: catMap['Dryck'], name: 'The Golden Lotus', nameEn: 'The Golden Lotus', price: 185, description: 'Mekhong Whiskey, citrongräs, ingefära, bladguld.', image: '/images/Signature Cocktail The Golden Lotus.png' }
    ]);

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
