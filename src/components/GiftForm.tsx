import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import { Gift, ImagePlus, AlertCircle, X } from 'lucide-react';

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
  const [imageUrl, setImage] = useState(initialData.imageUrl || '');
  const [price, setPrice] = useState(initialData.price?.toString() || '');
  const [priority, setPriority] = useState(initialData.priority || 'medium');
  const [previewError, setPreviewError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
      imageUrl: imageUrl || undefined,
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

  const handleImageError = () => {
    setPreviewError(true);
  };

  const priorityOptions = {
    high: { label: 'Alta', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    medium: { label: 'Média', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    low: { label: 'Baixa', color: 'bg-green-50 text-green-700 border-green-200' },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in max-w-xl w-full">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-serif text-gray-800 mb-1">
            {isEdit ? 'Editar Presente' : 'Adicionar Presente'}
          </h2>
          <p className="text-sm text-gray-500">Preencha os detalhes do presente abaixo</p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      {/* Ensure the form is scrollable on smaller screens */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 overflow-y-auto overscroll-contain h-full max-h-[60vh] custom-scrollbar"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Nome do Presente*
              </label>
              <div className="relative">
                <Gift size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                  placeholder="Ex: Conjunto de Taças"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                Preço (R$)
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                placeholder="Ex: 159.90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="priority">
                Prioridade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(priorityOptions).map(([value, { label, color }]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPriority(value as 'high' | 'medium' | 'low')}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${priority === value
                      ? color + ' border-current'
                      : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
                URL da Imagem
              </label>
              <div className="relative">
                <ImagePlus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="image"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setPreviewError(false);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
                  placeholder="Ex: https://example.com/image.jpg"
                />
              </div>

              {imageUrl && (
                <div className="mt-3 relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    {previewError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                        <AlertCircle size={24} className="mb-2" />
                        <p className="text-sm text-center">Não foi possível carregar a imagem</p>
                      </div>
                    ) : (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        onError={handleImageError}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
            Descrição*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-shadow"
            rows={3}
            placeholder="Descreva o presente..."
            required
          />
        </div>

        {/* Ensure the buttons are always visible */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium"
          >
            {isEdit ? 'Salvar Alterações' : 'Adicionar Presente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiftForm;