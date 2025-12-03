export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}