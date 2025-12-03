export interface PurchaseHistory {
  id: string;
  client_id: string;
  product_id?: string;
  service_id?: string;
  amount: number;
  date: Date;
  type: 'product' | 'service';
  created_at: Date;
  updated_at: Date;
}

export interface PurchaseHistoryInput {
  client_id: string;
  product_id?: string;
  service_id?: string;
  amount: number;
  date: Date;
  type: 'product' | 'service';
}