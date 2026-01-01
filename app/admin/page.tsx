import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { logout } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <div className="min-h-screen bg-background text-zinc-300 font-sans p-6 md:p-12 relative overflow-hidden">
            {/* Ambient Background Light - Subtle Warmth */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-white/2 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-serif font-bold tracking-[0.2em] text-white">BONN CHAI</span>
                        </Link>
                        <h1 className="text-3xl font-serif text-white italic">Management Console</h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light mt-2 font-semibold">
                            Inloggad som: {user.name} • <span className="text-zinc-400">{user.role}</span>
                        </p>
                    </div>

                    <form action={async () => {
                        "use server";
                        await logout();
                        redirect("/login");
                    }}>
                        <Button variant="outline" className="text-[10px] py-2 px-6">
                            Avsluta Session
                        </Button>
                    </form>
                </header>

                <main>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-900/50 border border-white/5 p-8 group hover:border-gold/20 transition-all duration-500 backdrop-blur-sm">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 font-medium">Aktiva Bokningar</h2>
                            <div className="flex items-baseline gap-4">
                                <p className="text-5xl font-serif text-white">0</p>
                                <p className="text-gold-light text-[10px] uppercase tracking-widest font-bold">Väntande verifiering</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <Button variant="ghost" className="w-full text-left p-0 justify-start hover:bg-transparent hover:text-gold transition-colors">Hantera Bokningskö →</Button>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-8 group hover:border-gold/20 transition-all duration-500 backdrop-blur-sm">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 font-medium">Meny Status</h2>
                            <div className="flex items-baseline gap-4">
                                <p className="text-5xl font-serif text-white">12</p>
                                <p className="text-gold-light text-[10px] uppercase tracking-widest font-bold">Aktiva rätter</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <Button variant="ghost" className="w-full text-left p-0 justify-start hover:bg-transparent hover:text-gold transition-colors">Redigera A la Carte →</Button>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-8 group hover:border-gold/20 transition-all duration-500 backdrop-blur-sm">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 font-medium">Service Rating</h2>
                            <div className="flex items-baseline gap-4">
                                <p className="text-5xl font-serif text-white">4.8</p>
                                <p className="text-gold-light text-[10px] uppercase tracking-widest font-bold">Av 5.0 Möjliga</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <Button variant="ghost" className="w-full text-left p-0 justify-start hover:bg-transparent hover:text-gold transition-colors">Visa Gästfeedback →</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 bg-zinc-900/30 border border-white/5 p-8 backdrop-blur-sm">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold-light mb-8 italic font-bold">Systemmeddelanden</h2>
                        <div className="space-y-4">
                            <div className="p-5 border-l-2 border-gold/40 bg-white/5 text-zinc-300 text-sm italic leading-relaxed">
                                "Säkerställ att Wagyu-leveransen verifieras vid ankomst imorgon kl 06:00." - Kökschefen
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
