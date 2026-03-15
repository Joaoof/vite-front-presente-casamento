import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const WelcomeBanner: React.FC = () => {
    const [step, setStep] = useState<0 | 1 | 2 | 'done'>(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('welcome_seen')) {
            setStep('done');
            return;
        }

        // Sequência de passos
        const timers = [
            setTimeout(() => setIsVisible(true), 500),
            setTimeout(() => { setIsVisible(false); setTimeout(() => { setStep(1); setIsVisible(true); }, 500); }, 3500),
            setTimeout(() => { setIsVisible(false); setTimeout(() => { setStep(2); setIsVisible(true); }, 500); }, 6500),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setStep('done');
            sessionStorage.setItem('welcome_seen', 'true');
        }, 500);
    };

    if (step === 'done') return null;

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-1000 ease-in-out ${isVisible ? 'bg-slate-950/95 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
            <style>{`
                .fade-up { 
                    transform: translateY(${isVisible ? '0' : '20px'}); 
                    opacity: ${isVisible ? '1' : '0'};
                    transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
                }
            `}</style>

            <div className="fade-up max-w-sm w-full px-6 text-center">

                {step === 0 && (
                    <div className="space-y-6">
                        <Heart size={32} strokeWidth={1.5} className="mx-auto text-slate-400" />
                        <div className="space-y-2">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-500 font-medium">Luís & Natiele</span>
                            <h1 className="text-3xl font-light tracking-tight text-slate-100">Bem-vindos ao nosso <br /> pequeno espaço</h1>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-light tracking-tight text-slate-100 italic">"O amor é paciente..."</h2>
                        <p className="text-slate-400 text-sm font-light leading-relaxed">
                            Estamos muito felizes em compartilhar esse momento com você. Cada detalhe foi pensado com carinho.
                        </p>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
                        <Heart size={24} className="mx-auto mb-6 text-rose-400/80" fill="currentColor" />
                        <h2 className="text-xl font-semibold text-slate-100 mb-3">Site</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light">
                            Criamos uma seleção para facilitar caso queira nos presentear, mas sua presença é o que mais importa.
                        </p>
                        <button
                            onClick={handleClose}
                            className="w-full bg-slate-100 hover:bg-white text-slate-950 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-white/5"
                        >
                            Veja nosso site
                        </button>
                        <p className="mt-6 text-[9px] uppercase tracking-widest text-slate-600">
                            Araguaína • 25 de Julho de 2026
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomeBanner;