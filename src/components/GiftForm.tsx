import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import { X } from 'lucide-react';

interface GiftFormProps {
  onSubmit: (gift: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
  initialData?: Partial<GiftType>;
  isEdit?: boolean;
}

const GiftForm: React.FC<GiftFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
  isEdit = false,
}) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState(initialData.image || '');
  const [price, setPrice] = useState(initialData.price?.toString() || '');
  const [priority, setPriority] = useState(initialData.priority || 'medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
      image: image || undefined,
      price: price ? Number(price) : undefined,
      priority: priority as 'high' | 'medium' | 'low',
    });

    // Reset form
    setName('');
    setDescription('');
    setImage('');
    setPrice('');
    setPriority('medium');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif text-gray-800">
          {isEdit ? 'Editar Presente' : 'Adicionar Presente'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nome do Presente*
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Ex: Conjunto de Taças"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Preço (R$)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Ex: 159.90"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Descrição*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            rows={3}
            placeholder="Descreva o presente..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            URL da Imagem
          </label>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Ex: https://example.com/image.jpg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="priority">
            Prioridade
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
          >
            {isEdit ? 'Salvar Alterações' : 'Adicionar Presente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiftForm;