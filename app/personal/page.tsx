"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function StaffPage() {
    const [staff, setStaff] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await fetch('/api/staff');
                if (res.ok) {
                    const data = await res.json();
                    setStaff(data);
                }
            } catch (error) {
                console.error('Failed to fetch staff:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-serif text-2xl">Laddar Vårt Team...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300">
            <Navbar />

            {/* Header / Hero */}
            <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/kockar och servitörer.png"
                        alt="Bonn Chai Team"
                        fill
                        className="object-cover opacity-50 blur-sm scale-110"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6 mt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4"
                    >
                        Människorna Bakom Menyn
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Vårt Team
                    </motion.h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-serif text-gold mb-8"
                    >
                        Ett hantverk byggt på kärlek
                    </motion.h2>
                    <p className="text-lg text-zinc-400 leading-relaxed italic">
                        "Varje person i mitt kök är handplockad, inte bara för sin skicklighet med kniven, utan för sin kärlek till vårt kulturarv. Tillsammans skapar vi inte bara mat, vi berättar en historia."
                        <span className="block mt-4 text-white font-bold non-italic font-serif">— Chef Somchai</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {staff.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-800 shadow-2xl">
                                <Image
                                    src={member.image || '/images/placeholder.png'}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-serif text-white mb-1 drop-shadow-2xl">{member.name}</h3>
                                    <p className="text-gold text-xs uppercase tracking-widest font-bold drop-shadow-md">{member.role}</p>
                                </div>
                            </div>
                            <div className="px-2">
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                    {member.bio}
                                </p>
                                <div className="w-8 h-[1px] bg-gold/30" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-zinc-900/50 py-24 border-y border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif text-white mb-12">Vår Filosofi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm tracking-widest uppercase">
                        <div>
                            <p className="text-gold font-bold mb-4">Gemenskap</p>
                            <p className="text-zinc-500 italic lowercase">En enad front i köket ger harmoni på tallriken.</p>
                        </div>
                        <div>
                            <p className="text-gold font-bold mb-4">Precision</p>
                            <p className="text-zinc-500 italic lowercase">Varje snitt och varje gram räknas.</p>
                        </div>
                        <div>
                            <p className="text-gold font-bold mb-4">Passion</p>
                            <p className="text-zinc-500 italic lowercase">Vi lagar mat vi själva älskar att äta.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
