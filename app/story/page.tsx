"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function StoryPage() {
    return (
        <div className="min-h-screen bg-black text-zinc-300">
            <Navbar />

            {/* Header / Hero */}
            <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/story-chef-1.png"
                        alt="Bonn Chai History"
                        fill
                        className="object-cover opacity-40 blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6 mt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4"
                    >
                        Vårt Arv
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        En resa i smak & tid
                    </motion.h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
                {/* Introduction Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Från Bangkoks bakgator till Stockholms finrum.</h2>
                        <div className="text-lg leading-loose space-y-6 font-sans">
                            <p>
                                Allt började långt bort från de vita dukarna och kristallglasen. I en livlig gränd i Bangkoks hjärta, där doften av citrongräs, galangal och rostad chili hänger tung i luften, stod mormor <span className="text-white font-bold">Boon-Nam</span> vid sin enorma gjutjärnsgryta.
                            </p>
                            <p>
                                Det var här, i den hettan och det kaoset, som hon i över femtio år förfinade sina recept. Hon lärde sig att lyssna på råvarorna, att balansera de fyra smakerna – salt, sött, surt och starkt – med en precision som inget mätinstrument i världen kan ersätta. Hennes <span className="text-gold italic">Massaman Curry</span> var inte bara mat; det var en institution, vallfärdad till av lokalbefolkningen.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] w-full rounded-sm"
                    >
                        <div className="absolute inset-0 border border-gold/20 -m-4 rounded-sm z-0" />
                        <div className="absolute inset-0 overflow-hidden rounded-sm z-10">
                            <Image
                                src="/images/kockar och servitörer.png"
                                alt="Mormor Boon-Nam's Arv"
                                fill
                                className="object-cover scale-125"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* The Transition Section */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-12" />
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-serif text-white mb-8 leading-snug"
                    >
                        "Vi tog inte bara med oss recepten.<br />Vi tog med oss själen."
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 font-sans leading-relaxed"
                    >
                        När familjen flyttade till Sverige bar vi med oss mer än bara bagage. Vi bar på ett kulinariskt ansvar. Att hedra Boon-Nams minne innebar att inte kompromissa. Men vi insåg också att för att göra hennes mat rättvisa i Norden, behövde vi gifta hennes tekniker med världens absolut bästa råvaror.
                    </motion.p>
                </div>

                {/* The Philosophy / Modern Day Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 relative h-[500px] w-full rounded-sm overflow-hidden group"
                    >
                        <Image
                            src="/images/The Golden Wagyu.png"
                            alt="The Golden Wagyu - En fusion"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Bonn Chai Idag</h2>
                        <div className="text-lg leading-loose space-y-6 font-sans">
                            <p>
                                Idag är <span className="text-white font-bold">Bonn Chai</span> resultatet av denna resa. Vi serverar inte "snabbmat". Vi serverar långkok som fått puttra i 48 timmar. Vi serverar <span className="text-white font-semibold">Svensk Wagyu</span> från utvalda gårdar, men kryddad med handmortlad currypasta gjord på recept som är äldre än oss själva.
                            </p>
                            <p>
                                Det handlar om respekt. Respekt för råvaran, respekt för hantverket och respekt för gästen. Varje tallrik som lämnar vårt kök är en del av vår historia, och när du äter hos oss, blir du en del av den.
                            </p>
                            <p className="text-gold font-serif text-xl italic pt-4">
                                – Välkommen till familjen.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer Simple */}
            <footer className="py-12 border-t border-white/5 bg-black text-center">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.1em]">© 2026 BONN CHAI THAI RESTAURANT. OUR LEGACY.</p>
            </footer>
        </div >
    );
}
