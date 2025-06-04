"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/Dialog"
import { Gift, Heart, Mail, User } from "lucide-react"

interface ReservationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (reservedBy: string) => void
    giftName: string
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onConfirm, giftName }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !email.trim()) {
            return
        }

        setIsLoading(true)

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        onConfirm(`${name.trim()} (${email.trim()})`)
        setIsLoading(false)
        setName("")
        setEmail("")
        onClose()
    }

    const handleClose = () => {
        setName("")
        setEmail("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                        <Gift className="w-6 h-6 text-rose-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">Reservar Presente</DialogTitle>
                    <DialogDescription className="text-base">Você está prestes a reservar o presente</DialogDescription>
                </DialogHeader>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200">
                    <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 text-lg">{giftName}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Seu Nome
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome completo"
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Seu E-mail
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="w-full sm:w-auto"
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white"
                            disabled={!name.trim() || !email.trim() || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Confirmando...
                                </>
                            ) : (
                                <>
                                    <Heart className="w-4 h-4 mr-2" />
                                    Confirmar Reserva
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReservationModal
