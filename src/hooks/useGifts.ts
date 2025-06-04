import { useState, useEffect } from 'react';
import { Gift } from '../types';
import { api } from '../services/api';

export const useGifts = (p0: (prev: any[]) => any[]) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'reserved'>('all');
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = async () => {
    try {
      setError(null);
      const data = await api.getGifts();
      setGifts(data);
    } catch (err) {
      setError('Falha ao carregar os presentes. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const addGift = async (gift: Omit<Gift, 'id' | 'createdAt' | 'status'>): Promise<void> => {
    try {
      setError(null);
      const newGift = await api.createGift(gift);
      setGifts(prev => [...prev, newGift]);
    } catch (err) {
      setError('Falha ao adicionar o presente. Tente novamente.');
      throw err;
    }
  };

  const updateGift = async (id: string, updates: Partial<Gift>): Promise<void> => {
    try {
      setError(null);
      // You need to provide a reservedBy value here, e.g., 'system' or get it from parameters
      const updatedGift = await api.reserveGift(id, updates.reservedBy ?? 'system');
      setGifts(prev => prev.map(gift => gift.id === id ? updatedGift : gift));
    } catch (err) {
      setError('Falha ao atualizar o presente. Tente novamente.');
      throw err;
    }
  };

  const removeGift = async (id: string): Promise<void> => {
    try {
      setError(null);
      await api.deleteGift(id);
      setGifts(prev => prev.filter(gift => gift.id !== id));
    } catch (err) {
      setError('Falha ao remover o presente. Tente novamente.');
      throw err;
    }
  };

  const reserveGift = async (id: string): Promise<void> => {
    await updateGift(id, { status: 'reserved' });
  };

  const filteredGifts = gifts
    .filter((gift) => {
      if (filter === 'available') return gift.status === 'available';
      if (filter === 'reserved') return gift.status === 'reserved';
      return true;
    })
    .filter((gift) =>
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  return {
    gifts: filteredGifts,
    isLoading,
    error,
    addGift,
    updateGift,
    removeGift,
    reserveGift,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    refetch: fetchGifts,
  };
};