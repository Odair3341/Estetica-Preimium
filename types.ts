export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  category: string;
  imageUrl?: string;
  description?: string;
}

export interface Appointment {
  id: string;
  serviceName: string;
  professionalName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  serviceTypeIcon?: string;
  price?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  loyaltyPoints: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface FinancialEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  source: 'esthetic' | 'store';
}

export interface CashRegister {
  id: string;
  date: string;
  openingBalance: number;
  closingBalance?: number;
  totalIncome: number;
  totalExpenses: number;
  entries: FinancialEntry[];
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  category: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate?: string;
  address?: string;
  loyaltyPoints: number;
  registrationDate: string;
}

export interface PurchaseHistory {
  id: string;
  clientId: string;
  productId?: string;
  serviceId?: string;
  amount: number;
  date: string;
  type: 'product' | 'service';
}

export enum NavigationTab {
  Home = 'home',
  Services = 'services',
  Store = 'store',
  Schedule = 'schedule',
  Profile = 'profile',
  Finance = 'finance',
  Management = 'management'
}