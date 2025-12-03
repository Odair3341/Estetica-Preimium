export interface Procedure {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProcedureInput {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}