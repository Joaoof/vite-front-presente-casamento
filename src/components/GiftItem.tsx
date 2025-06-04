import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import { openWhatsApp } from '../services/whatsapp';
import { Gift } from 'lucide-react';
import ReservationModal from './ReservationModal';

interface GiftItemProps {
  gift: GiftType;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReserve: (reservedBy: string) => void;
  coupleNames: string;
}

const GiftItem: React.FC<GiftItemProps> = ({
  gift,
  isAdmin,
  onEdit,
  onDelete,
  onReserve,
  coupleNames,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleReserveClick = () => {
    setShowModal(true);
  };

  const handleReserveConfirm = async (reservedBy: string) => {
    try {
      onReserve(reservedBy);
      console.log('ESSA È A FUNÇÂO DE RESERVAR', reservedBy);

      // Chama a função que vai pro service
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao reservar presente:', error);
      alert('Erro ao reservar. Tente novamente.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-2 hover:shadow transition-shadow">
      {/* Imagem */}
      <div className="w-full aspect-square mb-2 overflow-hidden rounded-md bg-white">
        {gift.imageUrl ? (
          <img
            src={gift.imageUrl}
            alt={gift.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gift size={24} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Nome do Presente */}
      <h3 className="text-xs sm:text-[13px] font-medium text-gray-800 mb-1 line-clamp-2 min-h-[2.5em]">
        {gift.name}
      </h3>

      {/* Preço */}
      <p className="text-sm font-medium text-gray-900 mb-2">
        R$ {gift.price?.toFixed(2).replace('.', ',')}
      </p>

      {/* Botão de Presentear */}
      {gift.status === 'available' && !isAdmin && (
        <button
          onClick={handleReserveClick}
          className="w-full bg-[#A88B7C] text-white py-1.5 rounded text-xs font-medium hover:bg-[#97796A] transition-colors"
        >
          Presentear
        </button>
      )}

      {/* Modal de Reserva */}
      <ReservationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleReserveConfirm}
        giftName={gift.name}
      />

      {/* Botões Admin */}
      {
        isAdmin && (
          <div className="flex gap-1 mt-2">
            <button
              onClick={onEdit}
              className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-xs"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="flex-1 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-xs"
            >
              Excluir
            </button>
          </div>
        )
      }
    </div >
  );
};

export default GiftItem;