import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Initialize the Google Generative AI client with the API key
// TODO: Move this to environment variables later for security
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || process.env.Google_Generative_AI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

import { db } from '@/lib/db/client';
import { staff, categories, menuItems } from '@/lib/db/schema';


export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Fetch context data from database
        const [staffData, allMenuItems, allCategories] = await Promise.all([
            db.select().from(staff),
            db.select().from(menuItems),
            db.select().from(categories),
        ]);

        // Format menu context
        const menuContext = allCategories
            .sort((a, b) => a.order - b.order)
            .map(cat => {
                const items = allMenuItems.filter(i => i.categoryId === cat.id);
                if (items.length === 0) return null;
                return `KATEGORI: ${cat.name}\n${items.map(item =>
                    `- ${item.name} (${item.price} kr): ${item.description} ` +
                    `[${item.spiceLevel > 0 ? 'Styrka: ' + item.spiceLevel + '/3' : 'Ej stark'}] ` +
                    `${item.isVegan ? '(Vegansk)' : ''} ${item.isVegetarian ? '(Vegetarisk)' : ''}`
                ).join('\n')}`;
            })
            .filter(Boolean)
            .join('\n\n');

        // Format staff context
        const staffContext = staffData
            .map(s => `NAMN: ${s.name}\nROLL: ${s.role}\nOM: ${s.bio}`)
            .join('\n\n');

        const systemPrompt = `
Du är Bonn Chai Thais officiella AI-assistent. Din uppgift är att vara en välkomnande, kunnig och hjälpsam värd för våra gäster online.

-- DIN PERSONLIGHET --
* Varm och inbjudande: Du pratar som en stolt familjemedlem som älskar restaurangens mat och historia.
* Kunnig: Du kan allt om menyn, ingredienserna och personalen.
* Säljande men ärlig: Rekommendera rätter baserat på vad gästen gillar.

-- RESTAURANGENS DATABAS (ANVÄND DETTA FÖR FAKTA) --

=== VÅR PERSONAL & HISTORIA ===
${staffContext}

=== VÅR MENY ===
${menuContext}

-- SÄRSKILDA INSTRUKTIONER --
* Om någon frågar om en specifik rätt, beskriv den målande.
* Om någon undrar om personalen, berätta om deras bakgrund från databasen.
* Om någon vill boka bord, be dem att gå till bokningssidan eller ringa oss.
* Prata alltid svenska om inte gästen pratar engelska.
* HÅLL SVAREN KORTA OCH KONCISA. Undvik långa paragrafer om det inte efterfrågas. Använd punktlistor för listor.

Svara som en trevlig servitör, men var "to the point".
`;

        // Use streaming with the working model gemini-2.5-flash
        const result = await streamText({
            model: google('gemini-2.5-flash'),
            messages,
            system: systemPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('AI API Error:', error);
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Error processing request',
            details: error
        }), { status: 500 });
    }
}
