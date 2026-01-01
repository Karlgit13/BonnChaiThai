"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch('/api/admin/dashboard');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.role === 'admin') {
            fetchDashboard();
        }
    }, [user]);

    if (authLoading || loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Laddar...</div>;
    }

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto pt-32 px-6 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-zinc-500">Välkommen tillbaka, Chef. Här är läget just nu.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Totala Bokningar', value: data?.stats.totalBookings, sub: 'Senaste 30 dagarna', color: 'bg-gold/10 text-gold' },
                        { label: 'Förväntad Intäkt', value: `${data?.stats.totalRevenue.toLocaleString()} SEK`, sub: 'Baserat på sällskapsstorlek', color: 'bg-green-500/10 text-green-500' },
                        { label: 'Tillväxt', value: data?.stats.monthlyGrowth, sub: 'Jämfört med förra månaden', color: 'bg-blue-500/10 text-blue-500' },
                        { label: 'Populäraste Tid', value: data?.stats.popularTime, sub: 'Flest bokningar kl 19:00', color: 'bg-purple-500/10 text-purple-500' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl"
                        >
                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">{stat.label}</p>
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-serif font-bold">{stat.value}</span>
                                <span className={`text-[10px] px-2 py-1 rounded-full ${stat.color} font-bold mb-1`}>
                                    {stat.sub === 'Senaste 30 dagarna' ? 'Active' : stat.sub.split(' ')[0]}
                                </span>
                            </div>
                            <p className="text-[10px] text-zinc-600 mt-2">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings Table */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-serif font-semibold">Senaste Bokningar</h2>
                            <Button variant="outline" className="text-xs h-8">Exportera</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                                        <th className="px-8 py-4 font-medium">Kund</th>
                                        <th className="px-8 py-4 font-medium">Datum & Tid</th>
                                        <th className="px-8 py-4 font-medium">Sällskap</th>
                                        <th className="px-8 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data?.bookings.map((booking: any) => (
                                        <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                                                        {booking.customerName[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{booking.customerName}</p>
                                                        <p className="text-[10px] text-zinc-500">{booking.customerEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm">{booking.date}</p>
                                                <p className="text-[10px] text-zinc-500">{booking.timeSlot}</p>
                                            </td>
                                            <td className="px-8 py-5 text-sm">
                                                {booking.partySize} pers
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider
                                                    ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                                        booking.status === 'completed' ? 'bg-blue-500/10 text-blue-500' :
                                                            'bg-zinc-500/10 text-zinc-500'}
                                                `}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Performance/Stats Side Area */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl"
                        >
                            <h2 className="text-xl font-serif font-semibold mb-6">Försäljning per Dag</h2>
                            <div className="space-y-6">
                                {[
                                    { day: 'Måndag', val: 65 },
                                    { day: 'Tisdag', val: 45 },
                                    { day: 'Onsdag', val: 80 },
                                    { day: 'Torsdag', val: 95 },
                                    { day: 'Fredag', val: 100 },
                                    { day: 'Lördag', val: 90 },
                                    { day: 'Söndag', val: 30 },
                                ].map((d, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                                            <span>{d.day}</span>
                                            <span className="text-white">{d.val}% Beläggning</span>
                                        </div>
                                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${d.val}%` }}
                                                className="h-full bg-gold"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gold p-8 rounded-3xl text-black"
                        >
                            <h3 className="text-lg font-serif font-bold mb-2">Familjebesked</h3>
                            <p className="text-sm opacity-80 mb-6">"Vi har ett stort sällskap bokat för morgondagen. Se till att vi har extra personal förberedda."</p>
                            <Button variant="outline" className="w-full border-black/20 text-black hover:bg-black/5">Hantera Personal</Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
