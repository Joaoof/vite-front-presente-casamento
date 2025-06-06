import React, { useState, useEffect } from 'react';
import { Gift } from '../types';
import GiftItem from './GiftItem';
import { ChevronLeft, ChevronRight, PresentationIcon } from 'lucide-react';
import ReservationModal from './ReservationModal';

interface GiftListProps {
  isAdmin: boolean;
  onEditGift: (gift: Gift) => void;
  onDeleteGift: (id: string) => void;
  onReserveGift: (id: string, reservedBy: string) => void;
  coupleNames: string;
  filter: 'all' | 'available' | 'reserved';
  searchTerm: string;
  onFilterChange: (filter: 'all' | 'available' | 'reserved') => void;
  gifts: Gift[];
  onSearchChange: (term: string) => void;
}

const ITEMS_PER_PAGE = 12;

const GiftList: React.FC<GiftListProps> = ({
  isAdmin,
  onEditGift,
  onDeleteGift,
  onReserveGift,
  coupleNames,
  filter,
  onFilterChange,
}) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [hasError, setHasError] = useState(false);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchGifts = async (page: number) => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${API_URL}/gifts`);

      if (!response.ok) {
        if (!hasError) {
          alert('Erro ao carregar lista de presentes.');
          setHasError(true);
        }
        return;
      }

      const result = await response.json();

      // ✅ Garantir que sempre será um array
      const data = Array.isArray(result.data) ? result.data : [];

      setGifts(data);
      setTotalItems(result.meta?.total || data.length); // fallback para length do array
      setCurrentPage(page);
      setHasError(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      if (!hasError) {
        alert('Erro ao carregar lista de presentes.');
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts(1);
  }, [filter]);

  useEffect(() => {
    fetchGifts(currentPage);
  }, [currentPage]);

  const handleOpenModal = (gift: Gift) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  const handleConfirmReservation = async (reservedBy: string) => {
    if (selectedGift) {
      try {
        await onReserveGift(selectedGift.id, reservedBy);

        const successBanner = document.createElement('div');
        successBanner.className =
          'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out';
        successBanner.style.maxWidth = '90%';
        successBanner.innerText = `✅ Você reservou "${selectedGift.name}"!`;

        document.body.appendChild(successBanner);

        setTimeout(() => {
          successBanner.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(successBanner);
          }, 300);
        }, 4000);
      } catch (err) {
        alert('Erro ao reservar. Tente novamente.');
      } finally {
        setModalOpen(false);
        setSelectedGift(null);
        fetchGifts(currentPage); // Atualiza a lista após reserva
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center justify-center w-8 h-8 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-8 h-8 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="px-2 text-gray-400">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 rounded text-sm transition-colors ${i === currentPage ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
            }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="px-2 text-gray-400">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-8 h-8 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center justify-center w-8 h-8 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      );
    }

    return <div className="flex items-center justify-center gap-1 mt-8 mb-4">{pages}</div>;
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
          <PresentationIcon size={16} />
          <span className="text-xs">Reserve seu presente</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Ordenar lista por:</span>
          <select
            className="bg-transparent text-xs text-gray-800 focus:outline-none cursor-pointer"
            onChange={(e) =>
              onFilterChange(e.target.value as 'all' | 'available' | 'reserved')
            }
            value={filter}
          >
            <option value="all">A-Z</option>
            <option value="available">Disponíveis</option>
            <option value="reserved">Reservados</option>
          </select>
        </div>
      </div>

      {/* Informações da paginação */}
      {gifts.length > 0 && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Mostrando {currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1}-{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} de {totalItems} presentes
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : gifts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Nenhum presente encontrado.</p>
          {isAdmin && (
            <p className="text-gray-500 text-sm mt-2">
              Adicione presentes à lista clicando no botão acima.
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3 sm:gap-4">
            {gifts.map((gift) => (
              <GiftItem
                key={gift.id}
                gift={gift}
                isAdmin={isAdmin}
                onEdit={() => onEditGift(gift)}
                onDelete={() => onDeleteGift(gift.id)}
                onReserve={() => handleOpenModal(gift)}
                coupleNames={coupleNames}
              />
            ))}
          </div>
          {renderPagination()}
        </>
      )}

      {/* Modal de reserva */}
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