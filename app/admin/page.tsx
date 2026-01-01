import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { logout } from "@/lib/auth";

export default async function AdminPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-zinc-400">Inloggad som: {user.name} ({user.role})</p>
                    </div>

                    <form action={async () => {
                        "use server";
                        await logout();
                        redirect("/login");
                    }}>
                        <Button variant="outline" className="text-zinc-400 hover:text-white border-zinc-800">
                            Logga ut
                        </Button>
                    </form>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                        <h2 className="text-xl font-semibold mb-4 text-amber-500">Bokningar</h2>
                        <p className="text-4xl font-bold">0</p>
                        <p className="text-zinc-500 text-sm mt-2">Inga nya bokningar idag</p>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                        <h2 className="text-xl font-semibold mb-4 text-amber-500">Dagens Meny</h2>
                        <p className="text-4xl font-bold">12</p>
                        <p className="text-zinc-500 text-sm mt-2">Aktiva rätter i menyn</p>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                        <h2 className="text-xl font-semibold mb-4 text-amber-500">Recensioner</h2>
                        <p className="text-4xl font-bold">4.8</p>
                        <p className="text-zinc-500 text-sm mt-2">Baserat på senaste 50 omdömen</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
