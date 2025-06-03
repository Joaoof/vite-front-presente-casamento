export interface Gift {
  id: string;
  name: string;
  description: string;
  image?: string;
  price?: number;
  status: 'available' | 'reserved';
  priority?: 'high' | 'medium' | 'low';
  createdAt: number;
}

export interface User {
  isAdmin: boolean;
}