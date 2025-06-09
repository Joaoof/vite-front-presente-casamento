import { Gift } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log(API_URL);


export const api = {
  async getGifts(): Promise<Gift[]> {
    const response = await fetch(`${API_URL}/gifts`, {
      method: 'GET',
    });
    console.log(response);

    if (!response.ok) throw new Error('Falha ao buscar presentes');
    return response.json();
  },

  async createGift(gift: Omit<Gift, 'id' | 'createdAt' | 'status'>): Promise<Gift> {
    try {
      const response = await fetch(`${API_URL}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(gift),
      });

      console.log(response);

      if (!response.ok) throw new Error('Falha ao criar presente');
      return response.json();
    } catch (error) {
      console.error('Erro ao criar presente:', error);
      throw error;
    }
  },


  async reserveGift(giftId: string, guestName: string): Promise<Gift> {
    const response = await fetch(`${API_URL}/gifts/${giftId}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservedBy: guestName }),
    });

    console.log('ESSE AQUI È MEU RESPONSE SEU BOBÂO', response);


    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reserve gift');
    }

    return response.json();
  },

  async deleteGift(id: string) {
    try {
      const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Falha ao deletar presente');
    } catch (error) {
      console.error('Erro ao deletar presente:', error);
      throw error;
    }
  },

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log(response);

      if (!response.ok) throw new Error('Credenciais inválidas');
      return response.json();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async getGiftsPagination(
    page: number = 1,
    limit: number = 12,
    filter: 'all' | 'available' | 'reserved' = 'all',
    search: string = ''
  ): Promise<{ data: Gift[]; meta: any }> {
    const response = await fetch(
      `${API_URL}/gifts?page=${page}&limit=${limit}&filter=${filter}&search=${search}`
    );
    return response.json();
  },
};