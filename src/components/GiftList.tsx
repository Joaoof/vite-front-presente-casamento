import React, { useState, useEffect, useMemo } from 'react';
import { Gift } from '../types';
import GiftItem from './GiftItem';
import { ChevronLeft, ChevronRight, PresentationIcon, Search } from 'lucide-react';
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
  searchTerm,
  onSearchChange,
}) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false); // ✅ Abre detalhes
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [hasError, setHasError] = useState(false);

  // Busca todos os presentes (uma única vez por filtro)
  const fetchGifts = async () => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/gifts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (!hasError) {
          alert('Erro ao carregar lista de presentes.');
          setHasError(true);
        }
        return;
      }

      const result = await response.json();
      const data = Array.isArray(result) ? result : [];

      setGifts(data);
      setHasError(false);
      setCurrentPage(1); // Reset da página ao recarregar
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

  // Recarrega quando o filtro muda
  useEffect(() => {
    fetchGifts();
  }, [filter]);

  // Filtragem com case-insensitive já garantida
  const filteredGifts = useMemo(() => {
    return gifts
      .filter((gift) => {
        if (filter === 'available') {
          return gift.status === 'available'; // status false ou undefined = disponível
        }
        if (filter === 'reserved') {
          return gift.status === 'reserved'; // só os verdadeiramente reservados
        }
        return true; // 'all' — mostra tudo
      })
      .filter((gift) =>
        gift.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [gifts, filter, searchTerm]);

  const totalPages = Math.ceil(filteredGifts.length / ITEMS_PER_PAGE);
  const paginatedGifts = useMemo(() => {
    return filteredGifts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredGifts, currentPage]);

  const handleOpenModal = (gift: Gift) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  // ✅ Abre o modal de detalhes ao clicar na imagem
  const handleViewDetails = (gift: Gift) => {
    setSelectedGift(gift);
    setDetailsModalOpen(true);
  };

  const showSuccessToast = (giftName: string) => {
    const toast = document.createElement('div');
    toast.className =
      'fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-out opacity-0 translate-y-[-10px]';
    toast.style.maxWidth = '90%';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        <span class="text-sm font-medium">Presente reservado com sucesso, confira mais informações em seu e-mail</span>
      </div>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const handleConfirmReservation = async (reservedBy: string) => {
    if (selectedGift) {
      try {
        await onReserveGift(selectedGift.id, reservedBy);
        showSuccessToast(selectedGift.name);
      } catch (err) {
        alert('Erro ao reservar. Tente novamente.');
      } finally {
        setModalOpen(false);
        setSelectedGift(null);
        fetchGifts(); // Atualiza lista após reserva
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
          className={`w-8 h-8 rounded text-sm transition-colors ${i === currentPage ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
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
    <div className="animate-fade-in max-w-5xl mx-auto px-4">
      {/* Título e imagem */}
      <div className="text-center mb-1">
        <img
          src="https://i.postimg.cc/s24p309j/Noivos-em-Silhueta-e-Flores.png" // ✅ URL corrigida (sem espaço no final)
          alt="Noivos em silhueta decorativa"
          className="w-44 mx-auto mb-6 opacity-80"
        />
        <h2 className="m-6 text-xl font-serif text-[#9A7B6F]">LISTA DE PRESENTES</h2>
      </div>

      {/* Aviso importante sobre preços */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 max-w-md mx-auto">
        <p className="text-xs text-amber-800 text-center leading-relaxed">
          <strong>Atenção:</strong> Preços sujeitos a alteração. Os valores indicados são válidos para pagamento à vista (débito).
        </p>
      </div>

      {/* Botão de instrução e filtro de ordenação */}
      <div className="flex items-center justify-between gap-5 mb-6">
        <button className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded text-gray-600 hover:bg-gray-100 transition-colors">
          <PresentationIcon size={16} />
          <span className="text-xs">Reserve seu presente</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Ordenar lista por:</span>
          <select
            onChange={(e) => onFilterChange(e.target.value as 'all' | 'available' | 'reserved')}
            value={filter}
          >
            <option value="all">A-Z</option>
            <option value="available">Disponíveis</option>
            <option value="reserved">Reservados</option>
          </select>
        </div>
      </div>

      {/* Campo de pesquisa com lupa */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar presentes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Informações da paginação */}
      {filteredGifts.length > 0 && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Mostrando{' '}
            {paginatedGifts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredGifts.length)} de{' '}
            {filteredGifts.length} presentes
          </p>
        </div>
      )}

      {/* Carregamento */}
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : paginatedGifts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {gifts.length === 0
              ? 'Nenhum presente encontrado.'
              : 'Nenhum presente corresponde aos filtros.'}
          </p>
          {isAdmin && gifts.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">
              Adicione presentes à lista clicando no botão acima.
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Grid de presentes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3 sm:gap-4">
            {paginatedGifts.map((gift) => (
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

          {/* Paginação */}
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

      {/* Modal de detalhes do presente */}

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