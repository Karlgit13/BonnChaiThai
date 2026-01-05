'use client';

import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function ChatBot() {
    // Manual state management to bypass useChat hook issues
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [localInput, setLocalInput] = useState('');
    const [error, setError] = useState<Error | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalInput(e.target.value);
    };

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!localInput.trim() || isLoading) return;

        const content = localInput.trim();
        setLocalInput('');
        setError(null);

        // Add user message
        const userMessage = { id: Date.now().toString(), role: 'user' as const, content };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error('Network error');

            // Add placeholder for AI response
            const botMessageId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: botMessageId, role: 'assistant' as const, content: '' }]);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No reader available');

            let done = false;
            let accumulatedContent = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });

                // Simple stream parsing - this might need adjustment based on provider
                // The ai-sdk/google stream usually sends parts purely as text or formatted chunks
                accumulatedContent += chunkValue;

                setMessages(prev =>
                    prev.map(m =>
                        m.id === botMessageId
                            ? { ...m, content: accumulatedContent }
                            : m
                    )
                );
            }
        } catch (err) {
            console.error('Chat error:', err);
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-full max-w-[500px] bg-zinc-900 border border-gold/30 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col h-[600px] max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="bg-black/50 p-4 border-b border-gold/20 flex justify-between items-center backdrop-blur-sm">
                            <h3 className="text-gold font-serif tracking-wider">Bonn Chai AI</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white transition-colors"
                                aria-label="Stäng chatt"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center text-zinc-500 text-sm mt-8">
                                    <p>Hej! Jag är din personliga AI-assistent.</p>
                                    <p className="mt-2">Fråga mig om menyn, öppettider eller historien bakom Bonn Chai Thai.</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center text-red-400 text-sm p-3 bg-red-950/30 rounded-lg border border-red-500/20">
                                    <p>Något gick fel. Försök igen.</p>
                                </div>
                            )}

                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-gold/20 text-gold-light border border-gold/10'
                                            : 'bg-zinc-800 text-zinc-200 border border-white/5'
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800 text-zinc-400 border border-white/5 p-3 rounded-lg text-sm">
                                        <span className="animate-pulse">Skriver...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={onFormSubmit} className="p-3 border-t border-gold/10 bg-black/30">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-zinc-950/50 border border-zinc-700 rounded-md py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-zinc-600"
                                    value={localInput}
                                    placeholder="Skriv din fråga..."
                                    onChange={onInputChange}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!localInput.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-white disabled:opacity-30 disabled:hover:text-gold transition-colors"
                                    aria-label="Skicka meddelande"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-black border border-gold text-gold rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center justify-center z-50 hover:bg-gold hover:text-black transition-colors duration-300"
                aria-label={isOpen ? 'Stäng chatt' : 'Öppna chatt'}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </>
    );
}

