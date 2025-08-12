"use client"

import type React from "react"
import { useEffect } from "react"
import { X, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"

interface ViewDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    onReserve: () => void
    gift: {
        name: string
        description?: string
        price: number
        imageUrl?: string
        link?: string
        status: boolean
        reservedBy?: string
    }
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, onClose, onReserve, gift }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop com animação */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Modal com animação de escala - Ajustado para melhor responsividade */}
            <div
                className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 transition-all duration-300 transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <div
                    className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto flex flex-col mt-4 sm:mt-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Cabeçalho com ícone e título */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5 sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <ExternalLink className="text-blue-600" size={20} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Detalhes do Presente</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors p-1"
                            aria-label="Fechar"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Corpo com scroll interno - Melhorado layout para telas maiores */}
                    <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
                        {/* Imagem do presente */}
                        {gift.imageUrl ? (
                            <div className="w-full h-48 sm:h-60 md:h-72 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={gift.imageUrl || "/placeholder.svg"}
                                    alt={gift.name}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 sm:h-60 md:h-72 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 border border-dashed">
                                <span className="text-sm">Imagem não disponível</span>
                            </div>
                        )}

                        {/* Informações em grid para telas maiores */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {/* Nome */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">Nome do Presente</label>
                                <p className="text-gray-800 font-semibold text-base mt-1">{gift.name}</p>
                            </div>

                            {/* Descrição */}
                            {gift.description && (
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-600">Descrição</label>
                                    <p className="text-gray-700 text-sm leading-relaxed mt-1 whitespace-pre-line">{gift.description}</p>
                                </div>
                            )}

                            {/* Preço */}
                            <div>
                                <label className="text-sm font-medium text-gray-600">Valor Sugerido</label>
                                <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                                    {gift.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-sm font-medium text-gray-600">Disponibilidade</label>
                                <div className="flex items-center gap-2 mt-1">
                                    {gift.status ? (
                                        <>
                                            <CheckCircle size={16} className="text-green-500" />
                                            <span className="text-green-700 font-medium">Reservado</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle size={16} className="text-orange-500" />
                                            <span className="text-orange-700 font-medium">Disponível</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Link do produto */}
                            {gift.link && (
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-600">Link do Produto</label>
                                    <a
                                        href={gift.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:underline mt-1 text-sm"
                                    >
                                        Acessar site
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}

                            {/* Reservado por */}
                            {gift.reservedBy && (
                                <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-lg p-3">
                                    <label className="text-sm font-medium text-green-800">Reservado por</label>
                                    <p className="text-green-900 font-medium mt-1">{gift.reservedBy}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rodapé com ações - Melhorado para mobile */}
                    <div className="flex flex-col sm:flex-row gap-3 px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-xl sticky bottom-0">
                        <button
                            onClick={onClose}
                            className="py-3 px-6 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors flex-1 order-2 sm:order-1"
                        >
                            Fechar
                        </button>
                        {!gift.status && (
                            <button
                                onClick={onReserve}
                                className="py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1 order-1 sm:order-2"
                            >
                                ✅ Reservar este presente
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDetailsModal
