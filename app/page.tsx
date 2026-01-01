"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const signatureDishes = [
    {
      name: "The Golden Wagyu",
      price: "745 KR",
      description: "Långkokt svenskt Wagyu högrev, handmortlad curry, kanderad sötpotatis, rostade pekannötter och boonk-chai röd lök.",
      image: "/images/The Golden Wagyu.png",
      label: "Månadens rekommendation",
      highlight: "The Golden Wagyu"
    },
    {
      name: "Lobster Pad Thai",
      price: "595 KR",
      description: "Färsk hummer från västkusten, tamarind-reduktion på 48 h, risnudlar från Chanthaburi, toppad med 24k bladguld.",
      image: "/images/lobster-pad-thai.png",
      label: "Kockens val",
      highlight: "Royal Pad Thai"
    },
    {
      name: "Plum Wine Glazed Duck",
      price: "625 KR",
      description: "Confiterad anka, plommonvinsreduktion, stjärnanis-infuserad pak choi och jasminris från kungliga fälten i Isan.",
      image: "/images/plum-wine-duck.png",
      label: "Publikfavorit",
      highlight: "Emerald Duck"
    }
  ];

  const [selectedDish, setSelectedDish] = React.useState(signatureDishes[0]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Gemini_Generated_Image_lmxtbqlmxtbqlmxt.png"
            alt="Bonn Chai Thai Dining"
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
          />
          {/* Heavily Enhanced gradient for better text legibility on busy background */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/90" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-white uppercase tracking-[0.5em] text-xs font-sans mb-6 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Välkommen till en värld av smakperfektion
            </h2>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white leading-tight drop-shadow-2xl text-shadow-lg">
              Bonn Chai <span className="text-gradient-gold italic pr-4">Thai</span>
            </h1>
            <p className="text-white text-lg md:text-xl font-sans max-w-2xl mx-auto mb-16 font-medium drop-shadow-xl leading-relaxed text-shadow-md">
              Där urgamla thailändska familjekoncepter möter modern nordisk elegans.
              En kulinarisk resa som väntat på dig.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <Link href="/boka-bord">
                <Button
                  variant="gold"
                  className="px-12 py-5 text-[11px] tracking-[0.4em] font-bold shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:scale-105 transition-all duration-500 h-auto"
                >
                  RESERVERA BORD
                </Button>
              </Link>
              <Link href="/meny">
                <Button
                  variant="outline"
                  className="px-12 py-5 text-[11px] tracking-[0.4em] font-bold border-2 border-white text-white bg-black/40 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500 h-auto shadow-2xl"
                >
                  SE MENYN
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
        </motion.div>
      </section>

      {/* Exclusivity Banner */}
      <section className="py-12 bg-zinc-900 border-y border-white/5 relative overflow-hidden">
        <div className="ambient-glow -top-20 -left-20 w-64 h-64 opacity-5" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-zinc-400 uppercase tracking-[0.4em] text-[10px] font-medium">
            Nuvarande väntetid för helgbokningar: <span className="text-gold-light">4 veckor</span>
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section id="story" className="py-24 md:py-40 relative">
        <div className="ambient-glow top-1/4 right-0 w-96 h-96" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full"
          >
            <div className="absolute inset-0 border border-gold/20 -m-4 rounded-sm" />
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <Image
                src="/images/chef.png"
                alt="Vår kock"
                fill
                className="object-cover scale-125"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-gold uppercase tracking-[0.4em] text-xs mb-6 font-semibold">Arvet</h3>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">Generationer av precision.</h2>
            <div className="space-y-6 text-zinc-300 font-sans leading-loose text-lg">
              <p>
                <span className="text-white font-semibold">Bonn Chai</span> är inte bara en restaurang. Det är en hyllning till min mormor <span className="text-white font-semibold">Boon-Nam</span>,
                som i hjärtat av Bangkok tillbringade fem årtionden med att perfektionera sin
                hemliga bas för <span className="italic text-gold-light">Massaman Curry</span>.
              </p>
              <p>
                I Stockholm har vi tagit detta arv och lyft det till nya höjder. Vi använder endast
                de finaste råvarorna – från handplockade kryddor flugna direkt från Thailand till
                lokalt svenskt <span className="text-white font-semibold">Wagyu-kött</span> av högsta klass.
              </p>
            </div>
            <Link href="/story">
              <Button variant="outline" className="mt-12">Läs om vår historia</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Dish / Menu Invite */}
      <section id="menu" className="py-24 bg-zinc-900/40 relative">
        <div className="ambient-glow bottom-0 left-0 w-[500px] h-[500px] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-gold uppercase tracking-[0.4em] text-xs mb-4 font-semibold">Urval</h3>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Signaturrätter</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-12">
                {signatureDishes.map((dish, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer p-4 -mx-4 rounded-lg transition-colors duration-300 ${selectedDish.name === dish.name ? 'bg-white/5' : 'hover:bg-white/5'}`}
                    onClick={() => setSelectedDish(dish)}
                  >
                    {dish.label && (
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1 font-bold">
                        {dish.label}
                      </p>
                    )}
                    <div className="flex justify-between items-end mb-2 border-b border-white/5 pb-2 group-hover:border-gold/30 transition-colors">
                      <h4 className={`text-2xl font-serif soap-transition-colors ${selectedDish.name === dish.name ? 'text-gold' : 'text-white group-hover:text-gold'}`}>
                        {dish.name}
                      </h4>
                      <span className="text-gold-light font-sans tracking-widest uppercase text-sm font-bold">{dish.price}</span>
                    </div>
                    <p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-md">
                      {dish.description}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/meny" className="w-full md:w-auto mt-16 inline-block">
                <Button variant="gold" className="w-full">Se Hela Avsmakningsmenyn</Button>
              </Link>
            </div>

            <motion.div
              key={selectedDish.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="order-1 md:order-2 relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-sm"
            >
              <Image
                src={selectedDish.image}
                alt={selectedDish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-gold-light uppercase tracking-[0.4em] text-[10px] mb-2 font-bold">{selectedDish.label}</p>
                <h4 className="text-3xl font-serif text-white uppercase italic">{selectedDish.highlight}</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Exclusivity */}
      <section className="py-24 border-t border-white/5 relative">
        <div className="ambient-glow top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { label: "Bord", value: "12" },
            { label: "Kockar", value: "6" },
            { label: "Årgångsviner", value: "250+" },
            { label: "Chili-grad", value: "0-3" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-8 border border-white/5 bg-zinc-900/30 hover:border-gold/30 transition-all duration-500">
              <p className="text-3xl md:text-5xl font-serif text-white mb-2">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <span className="text-3xl font-serif font-bold tracking-widest text-white">BONN CHAI</span>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mt-2">Drottninggatan 12, Stockholm</p>
          </div>
          <div className="flex justify-center space-x-12 mb-12">
            <Link href="#" className="text-zinc-500 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.2em]">Instagram</Link>
            <Link href="#" className="text-zinc-500 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.2em]">Facebook</Link>
            <Link href="#" className="text-zinc-500 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.2em]">LinkedIn</Link>
          </div>
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.1em]">© 2026 BONN CHAI THAI RESTAURANT. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
