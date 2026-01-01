import { db } from './client';
import { staff } from './schema';

const STAFF_DATA = [
    {
        name: "Chef Somchai",
        role: "Grundare & Legend",
        bio: "Hjärtat i Bonn Chai. Med över 40 års erfarenhet och en outsinlig passion för thailändska smaker, är det Somchai som sätter standarden för allt vi gör. Varje morgon inspekterar han dagens råvaror personligt.",
        image: "/images/somchai_portrait.png"
    },
    {
        name: "Ladda",
        role: "Sous Chef",
        bio: "Ladda är expert på de fem grundsmakerna. Hennes förmåga att balansera sälta, sötma, syra, beska och hetta är legendarisk i köket. Hon ansvarar för att alla våra currys håller absolut högsta klass.",
        image: "/images/Ladda.png"
    },
    {
        name: "Malee",
        role: "Chef de Cuisine",
        bio: "Malee är bryggan mellan tradition och innovation. Hon har rest jorden runt för att plocka inspiration, men återvänder alltid till rötterna i familjens recept.",
        image: "/images/Malee.png"
    },
    {
        name: "Suchart",
        role: "Master of the Wok",
        bio: "Suchart är mannen som tämjer elden. Han hanterar woken med en sådan fart att det nästan ser ut som en dans. Ingen kan ge maten den där perfekta 'Wok Hei'-smaken som han.",
        image: "/images/Suchart.png"
    },
    {
        name: "Ploy",
        role: "Floor Manager",
        bio: "Ploy är den första du möter när du kliver in. Med sin varma thailändska gästfrihet och sitt skarpa öga för detaljer ser hon till att servicen flyter lika smidigt som matlagningen i köket.",
        image: "/images/Ploy.png"
    },
    {
        name: "Anong",
        role: "Chef de Rang",
        bio: "Anong representerar den unga generationen på Bonn Chai. Hon brinner för att lära ut historien bakom varje rätt till våra gäster och ser till att varje besök blir en lärande och smakrik resa.",
        image: "/images/Anong.png"
    }
];

async function seed() {
    console.log('🌱 Seeding staff...');

    try {
        // Clear existing staff to avoid duplicates (optional, for development)
        // await db.delete(staff); 

        for (const [index, member] of STAFF_DATA.entries()) {
            await db.insert(staff).values({
                name: member.name,
                role: member.role,
                bio: member.bio,
                image: member.image,
                order: index,
                isFamilyMember: true, // Assuming all are core family/team
            });
        }

        console.log('✅ Staff seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding staff:', error);
    } finally {
        process.exit(0);
    }
}

seed();
