import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import GiftForm from './GiftForm';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  onAddGift: (gift: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => void;
  giftToEdit: GiftType | null;
  onCancelEdit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  onAddGift,
  giftToEdit,
  onCancelEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth(); // ✅ Verifica se está logado

  if (!isAuthenticated) return null; // ✅ Não mostra nada se não estiver logado

  const handleSubmit = (gift: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => {
    onAddGift(gift);
    setShowForm(false);
  };

  const shouldShowForm = showForm || giftToEdit !== null;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-5 gap-4">
        <h2 className="text-2xl font-serif text-gray-800">Gerenciar Presentes</h2>

        {!shouldShowForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 button-gift text-white rounded-md hover:button-hover transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            Adicionar Presente
          </button>
        )}
      </div>

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
    </div>
  );
};

export default AdminPanel;