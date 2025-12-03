export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  is_new: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductInput {
  name: string;
  price: number;
  category: string;
  image_url: string;
  is_new: boolean;
}