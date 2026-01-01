"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(data.error || "Inloggning misslyckades");
            }
        } catch (err) {
            setError("Ett oväntat fel uppstod");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="bg-zinc-950 border border-white/5 p-12 shadow-2xl">
                    <div className="text-center mb-12">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-3xl font-serif font-bold tracking-[0.3em] text-white">BONN CHAI</span>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mt-2">Personal & Administration</p>
                        </Link>
                        <h1 className="text-xl font-serif text-white uppercase tracking-widest italic">Välkommen tillbaka</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3">E-postadress</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-zinc-800 text-white py-4 focus:outline-none focus:border-gold transition-colors font-sans"
                                placeholder="namn@bonnchaitthai.se"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3">Lösenord</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-zinc-800 text-white py-4 focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-[10px] uppercase tracking-wider text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button
                            className="w-full py-5"
                            variant="gold"
                            disabled={loading}
                        >
                            {loading ? "Verifierar..." : "Logga in"}
                        </Button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
                            Endast auktoriserad personal. <br />
                            Vänligen kontakta ledningen för åtkomst.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
