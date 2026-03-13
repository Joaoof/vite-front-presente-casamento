import React, { useState, useRef, useEffect } from 'react';
import { Music, X } from 'lucide-react'; // Adicionado o ícone X
import { toast } from 'react-toastify';

interface HeaderProps {
    coupleNames: string;
    weddingDate: string;
    isAdmin: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    backgroundImageUrl?: string; 
}

const Header: React.FC<HeaderProps> = ({
    coupleNames,
    weddingDate,
    isAdmin,
    onLoginClick,
    onLogoutClick,
    backgroundImageUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", 
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Estado da Modal
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    // Trava o scroll da página quando a modal estiver aberta
    useEffect(() => {
        if (showWelcomeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [showWelcomeModal]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        console.error('Erro de autoplay:', error);
                        toast.error('Não foi possível iniciar a música.');
                        setIsPlaying(false);
                    });
            }
        }
    };

    return (
        <div className="relative w-full h-screen flex flex-col">
            <audio ref={audioRef} loop src="/audio/fundo.mp3" preload="none" />

            {/* Modal de Mensagem Inicial */}
            {showWelcomeModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {/* Backdrop escuro e clicável */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowWelcomeModal(false)}
                        aria-hidden="true"
                    ></div>
                    
                    {/* Caixa da Modal */}
                    <div className="relative bg-[#FAF8F5] w-full max-w-lg p-10 md:p-14 rounded-xl shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                        {/* Botão Fechar */}
                        <button 
                            onClick={() => setShowWelcomeModal(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#9A7B6F] transition-colors"
                            aria-label="Fechar mensagem"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        <div className="w-12 h-[1px] bg-[#D9B59D] mb-6"></div>
                        
                        <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-gray-800 mb-6 font-medium tracking-wide">
                            Seja Bem-Vindo!
                        </h2>
                        
                        {/* Parágrafo para evitar a "tela vazia" */}
                        <p className="font-['Montserrat'] text-sm md:text-base text-gray-600 leading-relaxed font-light">
                            Que alegria ter você aqui! Preparamos este espaço com muito carinho para compartilhar os detalhes do nosso grande dia. Sinta-se em casa, ouça nossa música e navegue pelas seções.
                        </p>

                        <div className="w-12 h-[1px] bg-[#D9B59D] mt-8"></div>
                    </div>
                </div>
            )}

            <button
                onClick={toggleAudio}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
                aria-label={isPlaying ? "Pausar música" : "Tocar música"}
            >
                {isPlaying ? (
                    <MusicNoteIcon className="w-5 h-5 text-white animate-pulse" />
                ) : (
                    <Music className="w-5 h-5 text-white/80" />
                )}
            </button>

            <nav className="relative z-20 w-full bg-white py-4 md:py-6 px-4 shadow-md flex justify-center items-center">
                <ul className="hidden md:flex items-center gap-8 text-[10px] md:text-[11px] font-['Montserrat'] font-medium tracking-[0.25em] text-gray-800 uppercase">
                    
                    {/* Link alterado para abrir a Modal */}
                    <li>
                        <button 
                            onClick={() => setShowWelcomeModal(true)} 
                            className="hover:text-gray-500 transition-colors uppercase tracking-[0.25em]"
                        >
                            Mensagem Inicial
                        </button>
                    </li>
                    
                    <li><a href="#sobre" className="hover:text-gray-500 transition-colors">Sobre Nós</a></li>
                    <li><a href="#cerimonia" className="hover:text-gray-500 transition-colors">Cerimônia</a></li>
                    <li><a href="#festa" className="hover:text-gray-500 transition-colors">Festa</a></li>
                    <li><a href="#presentes" className="hover:text-gray-500 transition-colors">Presentes</a></li>
                    <li><a href="#confirmar" className="hover:text-gray-500 transition-colors">Confirmar Presença</a></li>
                    
                    <li className="ml-4">
                        <button 
                            onClick={isAdmin ? onLogoutClick : onLoginClick}
                            className="text-[#9A7B6F] hover:text-[#7A5B4F] border border-[#9A7B6F] px-4 py-2 rounded transition-colors tracking-widest"
                        >
                            {isAdmin ? 'Sair' : 'Área do Casal'}
                        </button>
                    </li>
                </ul>

                <div className="md:hidden w-full flex justify-between items-center px-4">
                    <span className="text-xs font-['Montserrat'] tracking-widest font-semibold">MENU</span>
                    <button className="text-gray-800 p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </nav>

            <header className="relative flex-grow w-full flex flex-col items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                ></div>

                <div className="absolute inset-0 w-full h-full bg-black/40"></div>

                <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center mt-[-8vh]">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Cinzel'] text-white uppercase tracking-[0.2em] leading-tight text-shadow-lg font-medium">
                        {coupleNames}
                    </h1>
                    
                    <div className="w-full max-w-[80%] md:max-w-xl h-[1px] bg-white/70 my-6"></div>
                    
                    <p className="text-xs md:text-sm font-['Montserrat'] text-white font-light uppercase tracking-[0.4em] text-shadow-md">
                        {weddingDate}
                    </p>
                </div>
            </header>
        </div>
    );
};

const MusicNoteIcon = ({ className = '' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
);

export default Header;