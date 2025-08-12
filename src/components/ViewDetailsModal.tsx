import React from 'react';
import { X } from 'lucide-react';

interface ViewDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReserve: () => void;
    gift: {
        name: string;
        description?: string;
        price: number;
        imageUrl?: string;
        status: boolean;
        reservedBy?: string;
    };
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, onClose, onReserve, gift }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">Detalhes do Presente</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-6 space-y-4">
                    {gift.imageUrl && (
                        <div className="flex justify-center">
                            <img
                                src={gift.imageUrl}
                                alt={gift.name}
                                className="w-full max-h-60 object-contain rounded border"
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-600">Nome</label>
                        <p className="text-gray-800 font-medium">{gift.name}</p>
                    </div>

                    {gift.description && (
                        <div>
                            <label className="text-sm font-medium text-gray-600">Descrição</label>
                            <p className="text-gray-800 whitespace-pre-line text-sm">{gift.description}</p>
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-600">Preço</label>
                        <p className="text-blue-600 font-semibold">
                            {gift.price.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                    </div>

                    {/* {gift.link && (
                        <div>
                            <label className="text-sm font-medium text-gray-600">Link</label>
                            <a
                                href={gift.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline block mt-1 text-sm"
                            >
                                Ver produto
                            </a>
                        </div>
                    )} */}

                    <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <p className={gift.status ? 'text-green-600' : 'text-orange-600'}>
                            {gift.status ? '✅ Reservado' : '🟢 Disponível'}
                        </p>
                    </div>

                    {gift.reservedBy && (
                        <div>
                            <label className="text-sm font-medium text-gray-600">Reservado por</label>
                            <p className="text-gray-800">{gift.reservedBy}</p>
                        </div>
                    )}
                </div>

                {/* Ações */}
                <div className="flex gap-3 px-6 py-4 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Fechar
                    </button>
                    {!gift.status && (
                        <button
                            onClick={onReserve}
                            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Reservar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsModal;