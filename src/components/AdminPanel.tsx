import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import GiftForm from './GiftForm';
import {
  PlusCircle,
  Download,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
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
  gifts = [],
  onAddGift,
  onUpdateGift,
  onDeleteGift,
  giftToEdit,
  onCancelEdit,
}) => {
  const [openPanel, setOpenPanel] = useState<string | null>('list'); // form | list | export
  const [showExportMessage, setShowExportMessage] = useState(false);
  const [isExporting, setIsExporting] = useState(false); // Estado para indicar exportação em andamento
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const togglePanel = (panel: string) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  const handleSubmit = (giftData: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => {
    onAddGift(giftData);
    togglePanel('list');
  };

  const handleExport = async () => {
    if (!gifts || gifts.length === 0) {
      alert('Nenhum presente encontrado para exportar');
      return;
    }

    setIsExporting(true);

    try {
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
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-[#] p-4 sm:p-8">
      {/* Título */}
      <h2 className="text-center text-3xl font-serif text-gray-800 mb-8">Gerenciar Presentes</h2>

      {/* Painel 1: Adicionar/Editar Presente */}
      <AccordionPanel
        id="form"
        title="Adicionar ou Editar Presente"
        isOpen={openPanel === 'form'}
        onToggle={() => togglePanel('form')}
      >
        <GiftForm
          onSubmit={handleSubmit}
          onCancel={() => togglePanel('list')}
          initialData={giftToEdit || {}}
          isEdit={giftToEdit !== null}
        />
      </AccordionPanel>

      {/* Painel 2: Lista de Presentes */}
      <AccordionPanel
        id="list"
        title="Lista de Presentes"
        isOpen={openPanel === 'list'}
        onToggle={() => togglePanel('list')}
      >
        <PresentesList
          gifts={gifts}
          onUpdateGift={onUpdateGift}
          onDeleteGift={onDeleteGift}
        />
      </AccordionPanel>

      {/* Painel 3: Exportar Dados */}
      <AccordionPanel
        id="export"
        title="Exportar Dados"
        isOpen={openPanel === 'export'}
        onToggle={() => togglePanel('export')}
      >
        <div className="p-4">
          <button
            onClick={handleExport}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${isExporting
              ? 'bg-yellow-500 hover:bg-yellow-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
              }`}
            disabled={isExporting}
          >
            {isExporting ? (
              <span className="animate-spin mr-2 inline-block h-5 w-5 border-b-2 border-white rounded-full"></span>
            ) : (
              <Download size={18} className="mr-2" />
            )}
            <span>{isExporting ? 'Exportando...' : 'Exportar CSV'}</span>
          </button>
          {showExportMessage && (
            <p className="mt-3 text-sm text-green-600">✅ Lista exportada com sucesso!</p>
          )}
        </div>
      </AccordionPanel>
    </div>
  );
};

// Componente reutilizável para cada painel da sanfona
const AccordionPanel: React.FC<{
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ id, title, isOpen, onToggle, children }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm mb-4 bg-white">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div id={`panel-${id}`} className="bg-gray-50 p-4">{children}</div>}
    </div>
  );
};

// Componente reutilizável para exibir lista de presentes de forma responsiva
const PresentesList: React.FC<{
  gifts: GiftType[];
  onUpdateGift: (id: string, gift: Partial<GiftType>) => void;
  onDeleteGift: (id: string) => void;
}> = ({ gifts, onUpdateGift, onDeleteGift }) => {
  return (
    <>
      {/* Desktop - Tabela */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservado por</th>
              <th className="relative px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {gifts.length > 0 ? (
              gifts.map((gift) => (
                <tr key={gift.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{gift.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    R$ {gift.price?.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${gift.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {gift.status === 'available' ? 'Disponível' : 'Reservado'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {gift.reservedBy || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onUpdateGift(gift.id, gift)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit size={16} className="inline mr-1" /> Editar
                    </button>
                    <button onClick={() => onDeleteGift(gift.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} className="inline mr-1" /> Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  Nenhum presente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile - Cartões */}
      <div className="sm:hidden space-y-3">
        {gifts.length > 0 ? (
          gifts.map((gift) => (
            <div key={gift.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900">{gift.name}</h4>
              <p className="text-sm text-gray-600 mt-1">R$ {gift.price?.toFixed(2).replace('.', ',')}</p>
              <p className="text-sm text-gray-600">
                Status:{' '}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${gift.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {gift.status === 'available' ? 'Disponível' : 'Reservado'}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Reservado por: <strong>{gift.reservedBy || '-'}</strong>
              </p>
              <div className="mt-3 flex justify-end space-x-3">
                <button
                  onClick={() => onUpdateGift(gift.id, gift)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                >
                  <Edit size={14} className="mr-1" /> Editar
                </button>
                <button
                  onClick={() => onDeleteGift(gift.id)}
                  className="text-red-600 hover:text-red-900 text-sm flex items-center"
                >
                  <Trash2 size={14} className="mr-1" /> Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Nenhum presente cadastrado.</p>
        )}
      </div>
    </>
  );
};

export default AdminPanel;