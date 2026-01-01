"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Custom styles for DayPicker to match theme
const css = `
  .rdp {
    --rdp-cell-size: 50px;
    --rdp-accent-color: #D4AF37;
    --rdp-background-color: #27272a;
    margin: 0 auto;
  }
  .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
      background-color: var(--color-gold);
      color: black;
      font-weight: bold;
  }
  .rdp-day_today {
      color: var(--color-gold);
      font-weight: bold;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #3f3f46;
  }
`;

type TimeSlot = {
    time: string;
    availableSeats: number;
    isAvailable: boolean;
};

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [partySize, setPartySize] = useState(2);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    // Confirmation State
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingRef, setBookingRef] = useState("");

    // Fetch slots when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
            setSelectedSlot(null);
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate]);

    const fetchSlots = async (date: Date) => {
        setLoadingSlots(true);
        try {
            const dateStr = format(date, 'yyyy-MM-dd');
            const res = await fetch(`/api/bookings?date=${dateStr}`);
            if (res.ok) {
                const data = await res.json();
                setAvailableSlots(data);
            }
        } catch (error) {
            console.error("Failed to fetch slots", error);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot) return;

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: format(selectedDate, 'yyyy-MM-dd'),
                    timeSlot: selectedSlot,
                    partySize,
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    notes: formData.notes
                })
            });

            if (res.ok) {
                const data = await res.json();
                setBookingSuccess(true);
                // In a real app, we'd get the cancellation code from response
            } else {
                alert("Något gick fel med bokningen. Försök igen.");
            }
        } catch (error) {
            console.error("Booking error", error);
            alert("Ett fel inträffade.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-300">
            <style>{css}</style>
            <Navbar />

            {/* Hero */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/The Golden Wagyu.png"
                        alt="Boka Bord"
                        fill
                        className="object-cover opacity-40 blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
                </div>
                <div className="relative z-10 text-center">
                    <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Välkommen till bords</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-white">Boka Bord</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-20">
                {bookingSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-gold/30 p-12 rounded-2xl text-center shadow-2xl max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-gold">✓</div>
                        <h2 className="text-4xl font-serif text-white mb-4">Tack för din bokning!</h2>
                        <p className="text-zinc-400 mb-8">Vi ser fram emot att välkomna dig och ditt sällskap.</p>
                        <div className="bg-black/50 p-6 rounded-xl inline-block text-left">
                            <p className="text-gold text-sm uppercase tracking-wider mb-2">Bokningsdetaljer</p>
                            <p className="text-white"><span className="text-zinc-500 w-24 inline-block">Namn:</span> {formData.name}</p>
                            <p className="text-white"><span className="text-zinc-500 w-24 inline-block">Datum:</span> {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: sv })}</p>
                            <p className="text-white"><span className="text-zinc-500 w-24 inline-block">Tid:</span> {selectedSlot}</p>
                            <p className="text-white"><span className="text-zinc-500 w-24 inline-block">Antal:</span> {partySize} personer</p>
                        </div>
                        <div className="mt-10">
                            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10">
                                Boka nytt bord
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column: Selection */}
                        <div>
                            <div className="mb-10">
                                <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black text-sm font-bold">1</span>
                                    Välj Datum
                                </h3>
                                <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/10 inline-block w-full flex justify-center">
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        locale={sv}
                                        disabled={{ before: new Date(), after: new Date(new Date().setDate(new Date().getDate() + 56)) }} // 8 weeks
                                        className="text-zinc-300 bg-transparent"
                                    />
                                </div>
                            </div>

                            {selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black text-sm font-bold">2</span>
                                        Välj Tid & Antal
                                    </h3>

                                    <div className="mb-8">
                                        <label className="block text-zinc-400 text-sm mb-2">Antal gäster</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => setPartySize(num)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${partySize === num
                                                        ? 'bg-gold border-gold text-black font-bold scale-110'
                                                        : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-gold/50'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {loadingSlots ? (
                                        <div className="flex gap-2 animate-pulse">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="w-20 h-10 bg-zinc-800 rounded-lg"></div>)}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-4 gap-3">
                                            {availableSlots.map((slot) => {
                                                const disabled = !slot.isAvailable || slot.availableSeats < partySize;
                                                return (
                                                    <button
                                                        key={slot.time}
                                                        onClick={() => !disabled && setSelectedSlot(slot.time)}
                                                        disabled={disabled}
                                                        className={`py-2 px-3 rounded-lg text-sm border transition-all ${selectedSlot === slot.time
                                                            ? 'bg-gold border-gold text-black font-bold shadow-lg shadow-gold/20'
                                                            : disabled
                                                                ? 'bg-zinc-900/50 border-white/5 text-zinc-700 cursor-not-allowed decoration-slice'
                                                                : 'bg-zinc-900 border-zinc-700 text-white hover:border-gold/50'
                                                            }`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                    {availableSlots.length === 0 && !loadingSlots && format(selectedDate, 'yyyy-MM-dd') > '2026-02-01' && (
                                        <p className="text-amber-500 text-sm mt-2">Inga lediga tider detta datum.</p>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column: Form */}
                        <div className="relative">
                            <AnimatePresence>
                                {selectedDate && selectedSlot && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-zinc-900 border border-gold/20 p-8 rounded-2xl shadow-2xl sticky top-32"
                                    >
                                        <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black text-sm font-bold">3</span>
                                            Dina Uppgifter
                                        </h3>

                                        <form onSubmit={handleBooking} className="space-y-6">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Namn</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="För- och efternamn"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="namn@exempel.se"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Telefon</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="070-123 45 67"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Meddelande/Allergier (Valfritt)</label>
                                                <textarea
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all h-24 resize-none"
                                                    value={formData.notes}
                                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                    placeholder="Fira något speciellt? Allergier?"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors mt-4 shadow-lg shadow-gold/20"
                                            >
                                                Bekräfta Bokning
                                            </button>
                                            <p className="text-center text-xs text-zinc-600 mt-4">
                                                Genom att boka godkänner du vår personuppgiftspolicy.
                                            </p>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {!selectedSlot && selectedDate && (
                                <div className="h-full flex items-center justify-center p-10 border border-dashed border-white/10 rounded-2xl text-center">
                                    {format(selectedDate, 'yyyy-MM-dd') <= '2026-02-01' ? (
                                        <div className="max-w-sm">
                                            <p className="text-amber-500 text-lg font-serif mb-4">Fullbokat</p>
                                            <p className="text-zinc-400 text-sm leading-relaxed italic">
                                                Vi har för närvarande ett extremt högt tryck och är helt fullbokade fram till den 1:a februari.
                                                Vänligen välj ett senare datum i kalendern.
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-zinc-500 italic">Välj en tid för att fortsätta...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
