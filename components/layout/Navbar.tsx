"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Meny", href: "/meny" },
        { name: "Vår Story", href: "/story" },
        { name: "Recensioner", href: "/recensioner" },
        { name: "Personal", href: "/#staff" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="group flex items-center space-x-3">
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] text-white group-hover:text-gold transition-colors">
                            BONN CHAI
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.4em] text-gold-light text-center font-medium">
                            Thai Fine Dining
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-gold transition-colors font-medium drop-shadow-md"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="outline" className="text-[10px] py-2 px-4 border-gold/50 text-gold hover:bg-gold hover:text-black">
                        Boka Bord
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-zinc-950 border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm uppercase tracking-[0.2em] text-zinc-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button variant="gold" className="w-full">
                                Boka Bord
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
