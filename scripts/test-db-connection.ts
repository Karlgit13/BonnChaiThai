import postgres from 'postgres';

async function testDatabaseConnection() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('❌ DATABASE_URL is not set');
        process.exit(1);
    }

    console.log('🔍 Testing Azure PostgreSQL connection...');

    try {
        const sql = postgres(databaseUrl, {
            max: 1,
            idle_timeout: 5,
            connect_timeout: 10,
        });

        // Test simple query
        const result = await sql`SELECT NOW() as current_time, version() as pg_version`;

        console.log('✅ Database connection successful!');
        console.log(`   PostgreSQL Version: ${result[0].pg_version}`);
        console.log(`   Server Time: ${result[0].current_time}`);

        await sql.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

testDatabaseConnection();
