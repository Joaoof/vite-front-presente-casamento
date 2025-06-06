import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
    show: boolean;
    message: string;
    duration?: number;
    onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
    show,
    message,
    duration = 3000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsClosing(true);

                setTimeout(() => {
                    setIsVisible(false);
                    setIsClosing(false);
                    if (onClose) onClose();
                }, 500); // Animation duration

            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!isVisible && !show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div
                className={`
          max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden
          pointer-events-auto transform transition-all duration-500 
          ${isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          relative
        `}
            >
                {/* Rotating background image */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 
            animate-gradient-x opacity-60"
                    />
                    <div
                        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] 
            bg-cover bg-center animate-slow-rotate mix-blend-overlay opacity-20"
                    />
                </div>

                <div className="relative z-10 p-5 flex items-center">
                    <div className="flex-shrink-0 mr-3">
                        <div className="bg-green-50 rounded-full p-1.5">
                            <CheckCircle2 className="w-6 h-6 text-green-500 animate-success-pop" />
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <p className="text-gray-800 font-medium">{message}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-0.5">Você está conectado agora</p>
                    </div>
                </div>

                {/* Animated success indicator */}
                <div className="h-1 bg-gradient-to-r from-green-300 to-green-500 animate-shrink" />
            </div>
        </div>
    );
};      