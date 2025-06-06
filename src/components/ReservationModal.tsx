import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, Mail, Heart, Gift, Check, AlertCircle, X } from 'lucide-react';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reservedBy: string) => void;
    giftName: string;
    giftPrice?: number;
    giftDescription?: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    giftName,
    giftPrice,
    giftDescription,
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; email?: string } = {};
        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
        }
        if (!email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'E-mail inválido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            const reservedBy = `${name.trim()} <${email.trim()}>`;
            onConfirm(reservedBy);

            // Reset form
            setName('');
            setEmail('');
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Error submitting reservation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setName('');
            setEmail('');
            setErrors({});
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg bg-[#FFF0E6] border border-[#DAC8C8] shadow-2xl rounded-lg overflow-hidden p-0 max-h-[90vh]">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#B6C5D5] to-[#849CAF] border-b border-[#DAC8C8] px-8 py-6 relative">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-1.5 text-[] hover:text-white hover:bg-[#]/80 rounded-md transition-all duration-200"
                        disabled={isSubmitting}
                    >
                        <X size={18} />
                    </button>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F1B7A9] border border-[#E6A892] rounded-lg mb-4">
                            <Heart size={24} className="text-white" />
                        </div>
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-2xl font-noto">
                                Reservar Presente
                            </DialogTitle>
                            <DialogDescription className="text-sm font-noto">
                                Preencha os dados abaixo para confirmar sua reserva
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                {/* Gift Information Section */}
                <div className="bg-[#FFF0E6] border-b border-[#DAC8C8] px-8 py-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F1B7A9] border border-[#E6A892] rounded-lg flex items-center justify-center">
                            <Gift size={20} className="text-[#849CAF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-xl font-noto text-lg">{giftName}</h3>
                            {giftDescription && (
                                <p className="text-[#DAC8C8] text-sm mt-1">{giftDescription}</p>
                            )}
                            {giftPrice && (
                                <p className="text-[#849CAF] font-semibold mt-2">
                                    R$ {giftPrice.toFixed(2).replace('.', ',')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-noto mb-2">
                                Nome Completo *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text" />
                                </div>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                                    }}
                                    placeholder="Digite seu nome completo"
                                    className={`pl-10 h-11 border-[#849caf] rounded-md focus:border-[#849caf] focus:ring-[#849caf] transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'bg-[#FFF0E6]'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                        <AlertCircle size={14} />
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-noto mb-2">
                                E-mail *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="" />
                                </div>
                                <Input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                    placeholder="seu@email.com"
                                    type="email"
                                    className={`pl-10 h-11 border-[#849caf] rounded-md focus:border-[#849caf] focus:ring-[#849caf] transition-colors ${errors.email ? 'border-red-300 bg-red-50' : 'bg-[#FFF0E6]'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                                        <AlertCircle size={14} />
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-[#F1B7A9] pt-6 -mx-8 px-8">
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleClose}
                                className="flex-1 h-11 font-noto bg-slate-300 hover:bg-[#b6c5d5] hover:border-[#F1B7A9] transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 h-11 bg-[#F1B7A9] hover:bg-[#E6A892] text-black font-noto rounded-md font-medium shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-100 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        Confirmar Reserva
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="text-center pt-2 -mx-8 px-8">
                        <div className="flex items-center justify-center gap-2 text-xs text-[#DAC8C8]">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Seus dados estão protegidos</span>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReservationModal;