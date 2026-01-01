"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuItemData {
    name: string;
    price: string;
    description: string;
    image?: string;
    details?: string;
}

const MenuModal = ({ item, onClose }: { item: MenuItemData; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-zinc-900 border border-gold/20 rounded-lg overflow-hidden shadow-2xl"
            >
                <div className="relative h-[450px] w-full group">
                    <Image
                        src={item.image || "/images/dish-1.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 512px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors backdrop-blur-md z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8 pb-0 text-center z-10">
                        <h3 className="text-4xl font-serif text-gold mb-2 drop-shadow-lg">{item.name}</h3>
                        <p className="text-gold-light text-sm tracking-widest uppercase font-bold mb-4 drop-shadow-md">{item.price}</p>
                        <p className="text-zinc-200 font-sans leading-relaxed drop-shadow-md text-sm md:text-base">
                            {item.description}
                        </p>
                    </div>
                </div>
                <div className="px-8 pb-8 pt-6 text-center bg-zinc-900 relative z-20">
                    <div className="w-12 h-[1px] bg-white/10 mx-auto mb-6" />
                    <p className="text-zinc-500 text-xs italic">
                        {item.details || "Tillagad med passion och precision av våra mästerkockar med de finaste råvarorna för säsongen."}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const MenuSection = ({ title, items, delay = 0, separator = false, onItemClick }: {
    title: string,
    items: MenuItemData[],
    delay?: number,
    separator?: boolean,
    onItemClick: (item: MenuItemData) => void
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="mb-8"
    >
        <h3 className="text-3xl md:text-4xl font-serif text-gold mb-12 text-center">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="group cursor-pointer hover:bg-white/5 p-4 rounded-lg transition-all duration-300 -mx-4"
                    onClick={() => onItemClick(item)}
                >
                    <div className="flex justify-between items-end mb-3 border-b border-white/10 pb-2 group-hover:border-gold/30 transition-colors">
                        <h4 className="text-xl font-serif text-white group-hover:text-gold transition-colors">{item.name}</h4>
                        <span className="text-gold-light font-sans tracking-widest text-sm font-bold">{item.price}</span>
                    </div>
                    <p className="text-zinc-400 font-sans text-sm leading-relaxed italic">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
        {separator && (
            <div className="mt-16 mx-auto w-24 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        )}
    </motion.div>
);

export default function MenuPage() {
    const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <AnimatePresence>
                {selectedItem && (
                    <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/dish-1.png"
                        alt="Menu Background"
                        fill
                        className="object-cover opacity-40 blur-sm scale-105"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
                </div>
                <div className="relative z-10 text-center mt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4"
                    >
                        Kulinarisk Excellens
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-serif text-white mb-6"
                    >
                        Vår Meny
                    </motion.h1>
                </div>
            </div>

            {/* Menu Content */}
            <div className="max-w-5xl mx-auto px-6 pt-0 pb-20 relative z-10">

                <MenuSection
                    title="Förrätter"
                    separator
                    onItemClick={setSelectedItem}
                    items={[
                        { name: "Scallops & Betel", price: "245 KR", description: "Hälleflundra, kammussla, grön chili, kokosgrädde och betelblad.", details: "En sofistikerad förrätt som blandar sötman från kammusslor med hettan från grön chili.", image: "/images/scallops-betel.png" },
                        { name: "Wagyu Tartare", price: "325 KR", description: "Svensk Wagyu, rostad rispuff, kaffir lime, chili och äggula confit.", details: "Vår tolkning av den klassiska råbiffen, med en thailändsk twist och krispiga texturer.", image: "/images/wagyu-tartare.png" },
                        { name: "Royal Dumplings", price: "215 KR", description: "Hummer och räkor, tryffelolja, svart vinäger och vitlökchips.", details: "Handgjorda dumplings fyllda med havets läckerheter, toppade med exklusiv tryffel.", image: "/images/royal-dumplings.png" },
                        { name: "Tom Kha Gai Soup", price: "195 KR", description: "Krämig kokosmjölk, galangal, citrongräs, kyckling från Bjärehalvön.", details: "En värmande klassiker med perfekt balans mellan syra, sälta och sötma.", image: "/images/tom-kha-gai.png" }
                    ]}
                />

                <MenuSection
                    title="Varmrätter"
                    separator
                    delay={0.2}
                    onItemClick={setSelectedItem}
                    items={[
                        { name: "Wagyu Massaman", price: "745 KR", description: "Långkokt svenskt Wagyu högrev, handmortlad curry, kanderad sötpotatis, rostade pekannötter.", details: "Vår signaturrätt. Långkokt i 48 timmar för att uppnå absolut mörhet.", image: "/images/wagyu-massaman.png" },
                        { name: "Lobster Pad Thai", price: "595 KR", description: "Färsk hummer, tamarind-reduktion, risnudlar från Chanthaburi, 24k bladguld.", details: "En lyxig uppgradering av Thailands nationalrätt, serverad med guld för extra flärd.", image: "/images/lobster-pad-thai.png" },
                        { name: "Plum Wine Duck", price: "625 KR", description: "Confiterad anka, plommonvin, stjärnanis-pak choi, jasminris.", details: "Krispigt ankbröst möter sötman från plommonvin och aromatiska kryddor.", image: "/images/plum-wine-duck.png" },
                        { name: "Crispy Pork Belly", price: "425 KR", description: "Iberico grissida, holy basil, chili, vitlök och ostronsås.", details: "Klassisk thailändsk street food upphöjd till fine dining nivå.", image: "/images/crispy-pork-belly.png" },
                        { name: "Steamed Sea Bass", price: "495 KR", description: "Hel havsabborre, lime, chili, koriander och vitlökssås.", details: "Fräsch och syrlig, en rätt som låter råvarans kvalité tala för sig själv.", image: "/images/steamed-sea-bass.png" },
                        { name: "Gaeng Keow Wan", price: "395 KR", description: "Grön curry, majskyckling, thai-aubergine, sötbasilika och bambuskott.", details: "En aromatisk och kryddig grön curry med autentiska thailändska ingredienser.", image: "/images/gaeng-keow-wan.png" }
                    ]}
                />

                <MenuSection
                    title="Efterrätter"
                    separator
                    delay={0.4}
                    onItemClick={setSelectedItem}
                    items={[
                        { name: "Mango Sticky Rice", price: "185 KR", description: "Champagne-mango, kokosgrädde, rostade mungbönor, jasminblomma.", details: "Den ultimata thailändska desserten, gjord på de sötaste manguerna.", image: "/images/mango-sticky-rice.png" },
                        { name: "Thai Tea Crème Brûlée", price: "165 KR", description: "Klassiskt thai-te, bränd socker, kokosflarn.", details: "En fransk klassiker som möter Thailands älskade Cha Yen.", image: "/images/Thai Tea Crème Brûlée.png" },
                        { name: "Coconut Sorbet", price: "145 KR", description: "Hemgjord kokossorbet, ung kokos, rostade jordnötter.", details: "Svalkande och krämig sorbet serverad i en ung kokosnöt.", image: "/images/coconut_sorbet.png" },
                        { name: "Lychee & Rose Panna Cotta", price: "155 KR", description: "Vaniljpannacotta, litchi-gelé, rosenblad och krossade pistaschnötter.", details: "En elegant och blommig avslutning på middagen.", image: "/images/Lychee & Rose Panna Cotta thai style.png" }
                    ]}
                />

                <MenuSection
                    title="Årgångsviner & Dryck"
                    delay={0.6}
                    onItemClick={setSelectedItem}
                    items={[
                        { name: "Château Margaux 2015", price: "8500 KR", description: "Bordeaux, Frankrike. Elegant, strukturerad, perfekt till Wagyu.", image: "/images/Château Margaux 2015.png" },
                        { name: "Opus One 2018", price: "6200 KR", description: "Napa Valley, USA. Kraftfull, mörka bär, sammetslena tanniner.", image: "/images/Opus One 2018.png" },
                        { name: "Dom Pérignon 2013", price: "3900 KR", description: "Champagne, Frankrike. Krispig, rostat bröd, mineralitet.", image: "/images/Dom Pérignon 2013.png" },
                        { name: "Cloudy Bay Sauvignon Blanc", price: "895 KR", description: "Marlborough, Nya Zeeland. Tropisk frukt, lime, fräschör.", image: "/images/Cloudy Bay Sauvignon Blanc.png" },
                        { name: "Singha Premium Lager", price: "95 KR", description: "Thailand. 50cl fatöl.", image: "/images/Singha Premium Lager.png" },
                        { name: "Signature Cocktail: The Golden Lotus", price: "185 KR", description: "Mekhong Whiskey, citrongräs, ingefära, bladguld.", details: "Vår signaturcocktail serverad med äkta bladguld. En upplevelse för både öga och gom.", image: "/images/Signature Cocktail The Golden Lotus.png" }
                    ]}
                />

            </div>

            {/* Footer Minimal */}
            <div className="text-center py-12 border-t border-white/5 text-zinc-600 text-[10px] tracking-[0.2em]">
                BONN CHAI THAI RESTAURANT
            </div>
        </div>
    );
}
