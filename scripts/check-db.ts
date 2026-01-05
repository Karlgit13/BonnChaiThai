import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ DATABASE_URL is not defined in environment variables.');
    process.exit(1);
}

const sql = postgres(connectionString, { max: 1 });

async function checkConnection() {
    try {
        console.log('🔄 Attempting to connect to the database...');
        // Simple query to verify connection
        const result = await sql`SELECT 1 as "connection_test"`;

        if (result && result.length > 0) {
            console.log('✅ Database connection successful!');
            await sql.end();
            process.exit(0);
        } else {
            throw new Error('Database returned no results.');
        }
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        try {
            await sql.end();
        } catch (cleanupError) {
            // Ignore cleanup error
        }
        process.exit(1);
    }
}

checkConnection();
