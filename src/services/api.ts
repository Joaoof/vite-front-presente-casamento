import { Gift } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async getGifts(): Promise<Gift[]> {
    try {
      const response = await fetch(`${API_URL}/gifts`);
      console.log(response);

      if (!response.ok) throw new Error('Falha ao buscar presentes');
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar presentes:', error);
      throw error;
    }
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
      if (!response.ok) throw new Error('Falha ao criar presente');
      return response.json();
    } catch (error) {
      console.error('Erro ao criar presente:', error);
      throw error;
    }
  },

  async updateGift(id: string, gift: Partial<Gift>): Promise<Gift> {
    try {
      const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(gift),
      });
      if (!response.ok) throw new Error('Falha ao atualizar presente');
      return response.json();
    } catch (error) {
      console.error('Erro ao atualizar presente:', error);
      throw error;
    }
  },

  async deleteGift(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
};