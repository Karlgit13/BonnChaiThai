"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showBankID, setShowBankID] = useState(false);
    const [bankidStep, setBankidStep] = useState(0); // 0: initial, 1: scanning, 2: success
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (res.ok) {
                const data = await res.json();
                login(data.user);
                router.push(data.user.role === 'admin' ? '/admin' : '/');
            } else {
                const data = await res.json();
                setError(data.error || 'Inloggning misslyckades');
            }
        } catch (err) {
            setError('Ett fel inträffade vid inloggning');
        }
    };

    const handleBankIDLogin = () => {
        setShowBankID(true);
        setBankidStep(1);

        // Simulate BankID process
        setTimeout(() => {
            setBankidStep(2);
            setTimeout(async () => {
                // Finalize mock login
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isBankID: true })
                });
                const data = await res.json();
                login(data.user);
                setShowBankID(false);
                router.push('/');
            }, 1500);
        }, 3000);
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
                        <h1 className="text-3xl font-serif text-white mb-2">Välkommen Tillbaka</h1>
                        <p className="text-zinc-500 text-sm">Logga in för att hantera dina bokningar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg text-center">
                                {error}
                            </div>
                        )}

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
                                placeholder="••••••••"
                            />
                        </div>

                        <Button variant="gold" className="w-full py-4 rounded-xl font-bold uppercase tracking-widest">
                            Logga In
                        </Button>
                    </form>

                    <div className="mt-8 flex items-center gap-4 text-zinc-600">
                        <div className="h-[1px] flex-1 bg-zinc-800" />
                        <span className="text-[10px] uppercase tracking-widest">eller</span>
                        <div className="h-[1px] flex-1 bg-zinc-800" />
                    </div>

                    <button
                        onClick={handleBankIDLogin}
                        className="w-full mt-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-4 group"
                    >
                        <div className="w-6 h-6 bg-[#002f6c] rounded-md flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">B</span>
                        </div>
                        <span className="text-sm font-medium text-white group-hover:text-gold transition-colors">Mobilt BankID</span>
                    </button>

                    <p className="mt-8 text-center text-xs text-zinc-500">
                        Saknar du konto? <Link href="/register" className="text-gold hover:underline">Registrera dig här</Link>
                    </p>
                </motion.div>
            </div>

            {/* BankID Modal Mockup */}
            <AnimatePresence>
                {showBankID && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] w-[350px] aspect-[9/19] p-8 flex flex-col items-center justify-between text-black relative"
                        >
                            <div className="w-16 h-1 w-1/3 bg-zinc-200 rounded-full mt-2" />

                            <div className="flex-1 flex flex-col items-center justify-center w-full">
                                {bankidStep === 1 ? (
                                    <>
                                        <div className="relative mb-8">
                                            <div className="w-48 h-48 rounded-full border-4 border-zinc-100 flex items-center justify-center overflow-hidden">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        rotate: [0, 90, 180, 270, 360]
                                                    }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="w-40 h-40 bg-gradient-to-tr from-[#1b86d1] to-[#002f6c] opacity-10 rounded-full absolute"
                                                />
                                                <div className="w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-[#002f6c] rounded-lg"></div>
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{ top: ["0%", "100%", "0%"] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute left-0 w-full h-1 bg-[#1b86d1] shadow-[0_0_15px_#1b86d1]"
                                            />
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">Signerar...</h2>
                                        <p className="text-zinc-500 text-center text-sm">Identifiering för Bonn Chai Thai</p>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold">Klar!</h2>
                                        <p className="text-zinc-500 mt-2">Inloggning slutförd</p>
                                    </motion.div>
                                )}
                            </div>

                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BankID_logo.svg/1200px-BankID_logo.svg.png" className="w-24 mb-6 grayscale opacity-20" alt="BankID" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
