#!/usr/bin/env node
import { spawn } from 'child_process';

const PORT = process.env.PORT || 3000;

console.log('\n🚀 Starting development server...\n');

const nextDev = spawn('next', ['dev'], {
    stdio: 'inherit',
    shell: true
});

// Wait a bit for Next.js to start, then show URLs
setTimeout(() => {
    console.log('\n📍 Local URLs:');
    console.log(`   ➜ App:     \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`   ➜ Swagger: \x1b[36mhttp://localhost:${PORT}/api-doc\x1b[0m\n`);
}, 2000);

nextDev.on('close', (code) => {
    process.exit(code);
});
