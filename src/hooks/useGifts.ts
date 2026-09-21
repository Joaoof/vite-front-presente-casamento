import { useState, useEffect } from 'react';
import { Gift } from '../types';
import { api } from '../services/api';

export const useGifts = (coupleSlug?: string) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'reserved'>('all');

  const fetchGifts = async () => {
    try {
      const data = await api.getGifts(coupleSlug);
      setGifts(data);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, [coupleSlug]);

  const addGift = async (gift: Omit<Gift, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newGift = await api.createGift(gift, coupleSlug);
      setGifts(prev => [...prev, newGift]);
    } catch (error) {
      console.error('Error adding gift:', error);
      throw error;
    }
  };

  const updateGift = async (id: string, updates: Partial<Gift>) => {
    try {
      const updatedGift = await api.updateGift(id, updates, coupleSlug);
      setGifts(prev => prev.map(gift => gift.id === id ? updatedGift : gift));
    } catch (error) {
      console.error('Error updating gift:', error);
      throw error;
    }
  };

  const removeGift = async (id: string) => {
    try {
      await api.deleteGift(id, coupleSlug);

      setGifts(prev => prev.filter(gift => gift.id !== id));
    } catch (error) {
      console.error('Error removing gift:', error);
      throw error;
    }
  };

  const reserveGift = async (id: string, reservedBy: string) => {
    try {
      const updatedGift = await api.reserveGift(id, reservedBy, coupleSlug);
      setGifts(prev => prev.map(gift => gift.id === id ? updatedGift : gift));
      return updatedGift;
    } catch (error) {
      console.error('Error reserving gift:', error);
      throw error;
    }
  };

  const filteredGifts = gifts
    .filter((gift) => {
      if (filter === 'available') return gift.status === 'available';
      if (filter === 'reserved') return gift.status === 'reserved';
      return true;
    })
    .filter((gift) =>
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    gifts: filteredGifts,
    isLoading,
    addGift,
    updateGift,
    removeGift,
    reserveGift,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  };
};
