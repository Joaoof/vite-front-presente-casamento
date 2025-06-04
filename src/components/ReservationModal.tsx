// ReservationModal.tsx

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, Mail, Heart } from 'lucide-react';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reservedBy: string) => void; // ✅ Espera receber um string (nome + email)
    giftName: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onConfirm, giftName }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            alert('Por favor, preencha seu nome e e-mail');
            return;
        }

        const reservedBy = `${name.trim()} <${email.trim()}>`; // ✅ Formato esperado
        console.log(reservedBy);

        onConfirm(reservedBy); // ✅ Envia pro backend
        console.log(onConfirm);

        onClose(); // Fecha o modal
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reservar "{giftName}"</DialogTitle>
                    <DialogDescription>Preencha seus dados abaixo:</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Nome Completo</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="João Silva"
                            required
                        />
                    </div>

                    <div>
                        <label>E-mail</label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            type="email"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">Confirmar Reserva</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReservationModal;