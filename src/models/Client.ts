export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth_date?: string;
  address?: string;
  loyalty_points: number;
  created_at: Date;
  updated_at: Date;
}

export interface ClientInput {
  name: string;
  email: string;
  phone: string;
  birth_date?: string;
  address?: string;
  loyalty_points: number;
}