"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, MoreVertical, Search, Filter, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock Data
const INITIAL_REVIEWS = [
    {
        id: 1,
        name: "Karl Vareskog",
        avatar: "K",
        color: "bg-red-500",
        rating: 5,
        date: "2 dagar sedan",
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        text: "Helt fantastiskt! Bästa thaimaten jag ätit utanför Bangkok. Wagyu Massaman var en upplevelse utöver det vanliga. Mysig atmosfär och trevlig personal.",
        likes: 1_000_000,
        response: null
    },
    {
        id: 2,
        name: "Maria Karlsson",
        avatar: "M",
        color: "bg-blue-500",
        rating: 5,
        date: "1 vecka sedan",
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        text: "Otrolig service och maten var magisk. Lite dyrt kanske, men man betalar för kvalitet. Kommer definitivt tillbaka!",
        likes: 8,
        response: "Tack Maria! Vi strävar alltid efter att leverera högsta kvalitet. Välkommen åter! /Bonn Chai Team"
    },
    {
        id: 3,
        name: "Johan Lindberg",
        avatar: "J",
        color: "bg-green-500",
        rating: 4,
        date: "2 veckor sedan",
        timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
        text: "Maten var jättegod, men det var lite väl lång väntetid på bordet trots bokning. Annars toppen!",
        likes: 3,
        response: "Hej Johan, ledsen för väntetiden. Vi hade en ovanligt hektisk kväll. Hoppas vi kan göra det ännu smidigare nästa gång!"
    },
    {
        id: 4,
        name: "Emma Pettersson",
        avatar: "E",
        color: "bg-purple-500",
        rating: 5,
        date: "3 veckor sedan",
        timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000,
        text: "Autentiska smaker, älskade hummern! En pärla i Stockholm.",
        likes: 15,
        response: null
    },
    {
        id: 5,
        name: "Lars Nyström",
        avatar: "L",
        color: "bg-orange-500",
        rating: 5,
        date: "1 månad sedan",
        timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
        text: "Fantastiskt ställe. Kändes som att sitta på en lyxrestaurang i Asien. Rekommenderas starkt.",
        likes: 5,
        response: null
    }
];

const STAR_DISTRIBUTION = [
    { stars: 5, count: 85, percentage: 85 },
    { stars: 4, count: 12, percentage: 12 },
    { stars: 3, count: 2, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [filter, setFilter] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");
    const [likedReviews, setLikedReviews] = useState<number[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });

    const totalReviews = 142 + reviews.length - INITIAL_REVIEWS.length;
    const averageRating = 4.8;

    const handleLike = (id: number) => {
        if (likedReviews.includes(id)) {
            setLikedReviews(prev => prev.filter(lid => lid !== id));
            setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes - 1 } : r));
        } else {
            setLikedReviews(prev => [...prev, id]);
            setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
        }
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        const review = {
            id: Date.now(),
            name: newReview.name || "Anonym gäst",
            avatar: (newReview.name?.[0] || "A").toUpperCase(),
            color: "bg-zinc-700",
            rating: newReview.rating,
            date: "Just nu",
            timestamp: Date.now(),
            text: newReview.text,
            likes: 0,
            response: null
        };
        setReviews([review, ...reviews]);
        setIsModalOpen(false);
        setNewReview({ name: "", text: "", rating: 5 });
    };

    const filteredReviews = reviews
        .filter(r => r.text.toLowerCase().includes(searchTerm.toLowerCase()) || r.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (filter === "newest") return b.timestamp - a.timestamp;
            if (filter === "highest") return b.rating - a.rating;
            if (filter === "lowest") return a.rating - b.rating;
            return b.likes - a.likes; // 'relevant' defaults to likes for now
        });

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-sans">
            <Navbar />

            {/* Write Review Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 rounded-xl p-8 max-w-md w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-serif text-white mb-6">Dela din upplevelse</h2>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Betyg</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    fill={star <= newReview.rating ? "#D4AF37" : "none"}
                                                    color={star <= newReview.rating ? "#D4AF37" : "#52525b"}
                                                    size={24}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Ditt Namn</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        placeholder="T.ex. Anna A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Din Recension</label>
                                    <textarea
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none h-32 resize-none"
                                        value={newReview.text}
                                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                        placeholder="Berätta om maten, servicen, atmosfären..."
                                        required
                                    />
                                </div>
                                <Button variant="gold" className="w-full mt-4">Publicera Recension</Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header Area */}
            <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/kockar och servitörer.png"
                        alt="Restaurang Personal"
                        fill
                        className="object-cover opacity-40 blur-sm"
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
                        Våra Gäster
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
                    >
                        Vad våra gäster säger
                    </motion.h1>
                </div>
            </div>

            {/* Overall Rating & Distribution */}
            <div className="pb-20 px-6 pt-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-zinc-900 p-10 rounded-2xl border border-white/5 shadow-2xl">
                        {/* Overall Rating */}
                        <div className="text-center md:border-r border-white/5 md:pr-8">
                            <div className="text-7xl font-bold text-white mb-4">{averageRating}</div>
                            <div className="flex justify-center space-x-2 mb-4 text-gold">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} fill="currentColor" size={24} />
                                ))}
                            </div>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs">{totalReviews} recensioner</p>
                        </div>

                        {/* Distribution Bars */}
                        <div className="col-span-2 space-y-4 pl-0 md:pl-4">
                            {STAR_DISTRIBUTION.map((dist) => (
                                <div key={dist.stars} className="flex items-center text-xs tracking-wider">
                                    <span className="w-4 text-white font-bold">{dist.stars}</span>
                                    <div className="flex-1 mx-4 h-3 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gold rounded-full"
                                            style={{ width: `${dist.percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-10 text-right text-zinc-500">{dist.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row gap-6 justify-between items-center bg-black/40 p-2 rounded-full border border-white/5">
                        <div className="relative w-full md:w-auto flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="text"
                                placeholder="Sök i recensioner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none py-4 pl-14 pr-4 text-white w-full focus:ring-0 placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto px-2">
                            <div className="relative flex items-center">
                                <Filter size={14} className="absolute left-3 text-gold pointer-events-none" />
                                <select
                                    className="bg-zinc-900/80 border border-white/10 rounded-full py-3 pl-10 pr-8 text-white text-xs font-bold uppercase tracking-widest focus:outline-none cursor-pointer hover:border-gold/30 transition-colors appearance-none"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="relevant">Mest relevanta</option>
                                    <option value="newest">Nyaste</option>
                                    <option value="highest">Högsta betyg</option>
                                    <option value="lowest">Lägsta betyg</option>
                                </select>
                            </div>

                            <Button
                                variant="gold"
                                className="text-xs px-8 py-3 flex items-center gap-2 shadow-lg hover:shadow-gold/20"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Pencil size={14} />
                                Skriv en recension
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <motion.div
                            layout
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/20 rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg ${review.color} shadow-lg`}>
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-serif text-lg">{review.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider font-medium">
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <MoreVertical className="text-zinc-600 cursor-pointer hover:text-white" size={20} />
                            </div>

                            <div className="flex text-gold mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        color={i < review.rating ? "currentColor" : "#52525b"}
                                        size={16}
                                        className="mr-1"
                                    />
                                ))}
                            </div>

                            <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
                                {review.text}
                            </p>

                            {/* Owner Response */}
                            {review.response && (
                                <div className="ml-6 pl-6 border-l-2 border-gold/20 mt-6 bg-white/5 p-6 rounded-r-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                                        <p className="text-xs text-gold font-bold uppercase tracking-widest">Svar från Bonn Chai</p>
                                    </div>
                                    <p className="text-sm text-zinc-400 italic leading-relaxed">
                                        "{review.response}"
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={() => handleLike(review.id)}
                                    className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors group ${likedReviews.includes(review.id) ? 'text-gold' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    <ThumbsUp size={16} className={`group-hover:scale-110 transition-transform ${likedReviews.includes(review.id) ? 'fill-gold' : ''}`} />
                                    <span>Gilla ({review.likes})</span>
                                </button>
                                <button className="text-xs uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors">
                                    Dela
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-zinc-500">Inga recensioner hittades som matchar din sökning.</p>
                    </div>
                )}

                <div className="text-center pt-12">
                    <Button variant="outline" className="px-12 py-4 text-xs tracking-[0.2em] border-zinc-700 hover:bg-white hover:text-black">
                        Visa fler recensioner
                    </Button>
                </div>
            </div>

            {/* Footer Simple (copied from story page for consistency) */}
            <footer className="py-12 border-t border-white/5 bg-black text-center mt-auto">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.1em]">© 2026 BONN CHAI THAI RESTAURANT.</p>
            </footer>
        </div>
    );
}
