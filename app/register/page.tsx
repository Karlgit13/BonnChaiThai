"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            if (res.ok) {
                const data = await res.json();
                login(data.user);
                router.push('/');
            } else {
                const data = await res.json();
                setError(data.error || 'Registrering misslyckades');
            }
        } catch {
            setError('Ett fel inträffade vid registrering');
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-zinc-900 border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-white to-gold" />

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif text-white mb-2">Bli Medlem</h1>
                        <p className="text-zinc-500 text-sm">Gå med i Bonn Chai familjen idag</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Namn</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold transition-all"
                                placeholder="Förnamn Efternamn"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">E-post</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold transition-all"
                                placeholder="namn@exempel.se"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Lösenord</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold transition-all"
                                placeholder="Välj ett säkert lösenord"
                            />
                        </div>

                        <Button variant="gold" className="w-full py-4 rounded-xl font-bold uppercase tracking-widest">
                            Skapa Konto
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-xs text-zinc-500">
                        Har du redan ett konto? <Link href="/login" className="text-gold hover:underline">Logga in här</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
