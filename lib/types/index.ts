// Shared TypeScript types representing the database entities and common objects

export type UserRole = 'admin' | 'staff' | 'customer';

export interface User {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
}

export interface MenuCategory {
    id: number;
    name: string;
    nameEn: string;
    description: string | null;
    order: number;
}

export interface MenuItem {
    id: number;
    categoryId: number | null;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string | null;
    price: number;
    image: string | null;
    spiceLevel: number | null;
    isVegetarian: boolean | null;
    isVegan: boolean | null;
    isGlutenFree: boolean | null;
    allergens: string | null;
    isAvailable: boolean | null;
    createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'seated' | 'completed';

export interface Booking {
    id: number;
    date: string;
    timeSlot: string;
    partySize: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: BookingStatus;
    notes: string | null;
    cancellationCode: string;
    createdAt: string;
}

export interface StaffMember {
    id: number;
    name: string;
    role: string;
    roleEn: string | null;
    bio: string;
    bioEn: string | null;
    image: string | null;
    order: number | null;
    isFamilyMember: boolean | null;
}

export interface Review {
    id: number;
    customerName: string;
    rating: number;
    comment: string;
    visitDate: string | null;
    isVerified: boolean | null;
    isDisplayed: boolean | null;
    createdAt: string;
}

export interface RestaurantInfo {
    id: number;
    key: string;
    value: string;
    description: string | null;
}
