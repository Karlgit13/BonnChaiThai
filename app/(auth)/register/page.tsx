"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(data.error || "Registrering misslyckades");
            }
        } catch (err) {
            setError("Ett oväntat fel uppstod");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Skapa konto</h1>
                    <p className="text-zinc-400">Gå med i Bonn Chai Thai teamet</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Fullständigt namn</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                            placeholder="Namn Namnsson"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">E-post</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-sans"
                            placeholder="namn@exempel.se"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Lösenord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center font-sans">{error}</p>
                    )}

                    <Button
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-amber-900/20"
                        variant="default"
                    >
                        {loading ? "Skapar konto..." : "Registrera dig"}
                    </Button>
                </form>

                <p className="mt-8 text-center text-zinc-500 text-sm">
                    Har du redan ett konto?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-amber-500 hover:underline"
                    >
                        Logga in här
                    </button>
                </p>
            </motion.div>
        </div>
    );
}
