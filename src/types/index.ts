export interface Gift {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | 'https://img.cdndsgni.com/preview/10555726.jpg';
  price?: number;
  status: 'available' | 'reserved';
  priority?: 'high' | 'medium' | 'low';
  createdAt: number;
}

export interface User {
  isAdmin: boolean;
}