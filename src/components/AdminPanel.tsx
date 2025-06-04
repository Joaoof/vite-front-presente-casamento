import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import GiftForm from './GiftForm';
import { PlusCircle } from 'lucide-react';
import ReservationModal from './ReservationModal';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  gifts: GiftType[];
  onAddGift: (gift: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateGift: (id: string, gift: Partial<GiftType>) => void;
  onDeleteGift: (id: string) => void;
  giftToEdit: GiftType | null;
  onCancelEdit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  gifts = [], // ✅ Inicializa com array vazio
  onAddGift,
  onUpdateGift,
  onDeleteGift,
  giftToEdit,
  onCancelEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showExportMessage, setShowExportMessage] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const handleSubmit = (giftData: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => {
    onAddGift(giftData);
    setShowForm(false);
  };

  const handleReserveClick = (gift: GiftType) => {
    // Aqui você pode abrir um modal ou chamar uma função que faz isso
    console.log('Reservar presente:', gift);
  };

  const handleExport = () => {
    if (!gifts || gifts.length === 0) {
      alert('Nenhum presente encontrado para exportar');
      return;
    }

    const csvContent =
      'Nome Presente,Preço,Status,Reservado por\n' +
      gifts
        .filter((g) => g.status === 'reserved')
        .map(
          (g) =>
            `${g.name},${g.price?.toFixed(2).replace('.', ',')},${g.status},${g.reservedBy || ''}`,
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'presentes-reservados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportMessage(true);
    setTimeout(() => setShowExportMessage(false), 3000);
  };

  const shouldShowForm = showForm || giftToEdit !== null;

  return (
    <div className="mb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-serif text-gray-800">Gerenciar Presentes</h2>

        {!shouldShowForm && (
          <button
            onClick={() => setShowForm(true)}
            className="self-start md:self-auto flex items-center px-4 py-3 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors shadow-sm"
          >
            <PlusCircle size={20} className="mr-2" />
            Adicionar Presente
          </button>
        )}
      </div>

      {/* Formulário condicional */}
      {shouldShowForm && (
        <GiftForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            onCancelEdit();
          }}
          initialData={giftToEdit || {}}
          isEdit={giftToEdit !== null}
        />
      )}

      {/* Tabela de Presentes */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reservado por 
              </th>
              <th className="relative px-6 py-3 text-right">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
                >
                  Exportar CSV
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gifts.length > 0 ? (
              gifts.map((gift) => (
                <tr key={gift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{gift.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      R$ {gift.price?.toFixed(2).replace('.', ',') || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full ${gift.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {gift.status === 'available' ? 'Disponível' : 'Reservado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{gift.reservedBy || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onUpdateGift(gift.id, gift)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteGift(gift.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  Nenhum presente adicionado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showExportMessage && (
        <p className="mt-2 text-green-600 text-sm">Lista exportada com sucesso!</p>
      )}
    </div>
  );
};

export default AdminPanel;