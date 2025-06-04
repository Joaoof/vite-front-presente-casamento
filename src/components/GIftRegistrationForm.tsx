import React, { useState } from 'react';
import { Gift } from '../types';
import { api } from '../services/api';
import { AlertCircle, Check, Loader2 } from 'lucide-react';

interface GiftRegistrationFormProps {
    gift: Gift;
    onSuccess: () => void;
    onCancel: () => void;
}

const GiftRegistrationForm: React.FC<GiftRegistrationFormProps> = ({
    gift,
    onSuccess,
    onCancel,
}) => {
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (!validateEmail(guestEmail)) {
                throw new Error('Por favor, insira um e-mail válido.');
            }

            await api.reserveGift(gift.id, guestName);

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao registrar o presente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-modal-in">
                <div className="bg-gradient-to-r from-rose-50 to-rose-100 px-6 py-8">
                    <h2 className="text-2xl font-serif text-gray-800 mb-2">Reservar Presente</h2>
                    <p className="text-gray-600">{gift.name}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome Completo*
                        </label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                            required
                            disabled={isSubmitting || success}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail*
                        </label>
                        <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                            required
                            disabled={isSubmitting || success}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg flex items-center gap-2">
                            <Check size={18} />
                            Presente reservado com sucesso!
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
                            disabled={isSubmitting || success}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                            disabled={isSubmitting || success}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Reservando...
                                </>
                            ) : (
                                'Confirmar Reserva'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GiftRegistrationForm;