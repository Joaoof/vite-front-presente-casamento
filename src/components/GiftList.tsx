import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import GiftItem from './GiftItem';
import { ShoppingCart } from 'lucide-react';

interface GiftListProps {
  gifts: GiftType[];
  isAdmin: boolean;
  onEditGift: (gift: GiftType) => void;
  onDeleteGift: (id: string) => void;
  onReserveGift: (id: string, reservedBy: string) => void;
  coupleNames: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: 'all' | 'available' | 'reserved';
  onFilterChange: (filter: 'all' | 'available' | 'reserved') => void;
}

const GiftList: React.FC<GiftListProps> = ({
  gifts,
  isAdmin,
  onEditGift,
  onDeleteGift,
  onReserveGift,
  coupleNames,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  const [name, setName] = useState('');

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-1">
      <div className="text-center mb-1">
        <img
          src="https://sdmntpreastus.oaiusercontent.com/files/00000000-52ac-61f9-a42e-c0a5ec01657c/raw?se=2025-06-04T17%3A51%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=bcf45bce-c3a9-57e2-a619-898cf02ee9aa&skoid=02b7f7b5-29f8-416a-aeb6-99464748559d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-03T18%3A27%3A34Z&ske=2025-06-04T18%3A27%3A34Z&sks=b&skv=2024-08-04&sig=XxNfpM24l/ITVn5LDWF9ZcjzkBJ8hRND%2BHWqoIfpmUo%3D"
          alt="Decorative branch"
          className="w-44 mx-auto mb-6 opacity-80"
        />
        <h2 className="m-6 text-xl font-serif text-[#9A7B6F]">LISTA DE PRESENTES</h2>
      </div>

      <div className="flex items-center justify-between gap-5 mb-6">
        <button className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded text-gray-600 hover:bg-gray-100 transition-colors">
          <ShoppingCart size={16} />
          <span className="text-xs">Carrinho vazio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Ordenar lista por:</span>
          <select
            className="bg-transparent text-xs text-gray-800 focus:outline-none cursor-pointer"
            onChange={(e) => onFilterChange(e.target.value as 'all' | 'available' | 'reserved')}
            value={filter}
          >
            <option value="all">A-Z</option>
            <option value="available">Disponíveis</option>
            <option value="reserved">Reservados</option>
          </select>
        </div>
      </div>

      {gifts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Nenhum presente encontrado.</p>
          {isAdmin && <p className="text-gray-500 text-sm mt-2">Adicione presentes à lista clicando no botão acima.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3 sm:gap-4">
          {gifts.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              isAdmin={isAdmin}
              onEdit={() => onEditGift(gift)}
              onDelete={() => onDeleteGift(gift.id)}
              onReserve={() => onReserveGift(gift.id, gift.reservedBy ?? '')}
              coupleNames={coupleNames}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftList;