import React, { useState } from 'react';
import { Gift, Gift as GiftType } from '../types';
import GiftItem from './GiftItem';
import { ShoppingCart } from 'lucide-react';
import ReservationModal from './ReservationModal';

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
  filter,
  onFilterChange,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleOpenModal = (gift: Gift) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  const handleConfirmReservation = async (reservedBy: string) => {
    if (selectedGift) {
      try {
        await onReserveGift(selectedGift.id, reservedBy);
        alert('Presente reservado com sucesso!');
      } catch (err) {
        alert('Erro ao reservar presente');
      } finally {
        setModalOpen(false);
        setSelectedGift(null);
      }
    }
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-1">
      <div className="text-center mb-1">
        <img
          src="https://i.postimg.cc/s24p309j/Noivos-em-Silhueta-e-Flores.png"
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
          {isAdmin && (
            <p className="text-gray-500 text-sm mt-2">
              Adicione presentes à lista clicando no botão acima.
            </p>
          )}
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
              onReserve={() => handleOpenModal(gift)} // ✅ Abre o modal certo
              coupleNames={coupleNames}
            />
          ))}
        </div>
      )}

      {/* ⬇️ Fora da grid! Isso aqui é fundamental */}
      {selectedGift && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedGift(null);
          }}
          onConfirm={handleConfirmReservation}
          giftName={selectedGift.name}
        />
      )}
    </div>
  );
};

export default GiftList;
