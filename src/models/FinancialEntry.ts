export interface FinancialEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: Date;
  source: 'esthetic' | 'store';
  created_at: Date;
  updated_at: Date;
}

export interface FinancialEntryInput {
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: Date;
  source: 'esthetic' | 'store';
}