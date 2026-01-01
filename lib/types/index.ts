// Shared TypeScript types for the entire monorepo

export interface MenuItem {
    id: number;
    categoryId: number;
    name: string;
    nameEn: string;
    description: string;
    price: number;
    image?: string;
    spiceLevel?: number;
    isVegetarian: boolean;
    isGlutenFree: boolean;
    allergens?: string;
}

export interface MenuCategory {
    id: number;
    name: string;
    nameEn: string;
    description?: string;
    order: number;
}

export interface Booking {
    id: number;
    date: Date;
    time: string;
    partySize: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes?: string;
}

export interface Staff {
    id: number;
    name: string;
    role: string;
    bio: string;
    image?: string;
    background?: string;
}

export interface Review {
    id: number;
    customerName: string;
    rating: number;
    comment: string;
    date: Date;
    verified: boolean;
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'customer';
}
