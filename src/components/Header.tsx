import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';

interface HeaderProps {
  coupleNames: string;
  weddingDate: string;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  coupleNames,
  weddingDate,
  isAdmin,
  onLoginClick,
  onLogoutClick,
}) => {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const hidePrompt = () => {
    setShowMusicPrompt(false);
  };

  return (
    <>
      {/* Prompt de música */}
      {showMusicPrompt && (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700">Deseja ouvir a música de fundo?</p>
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="px-3 py-1 bg-[#A88B7C] text-white rounded hover:bg-[#97796A] transition-colors"
            >
              Sim, quero ouvir
            </button>
            <button
              onClick={hidePrompt}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Não
            </button>
          </div>
        </div>
      )}

      {/* Iframe do YouTube - oculto visualmente */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 w-1 h-1 opacity-0 overflow-hidden pointer-events-none">
          <iframe
            width="1"
            height="1"
            src={`https://www.youtube.com/embed/nLnp0tpZ0ok?autoplay=1&loop=1&playlist=nLnp0tpZ0ok&controls=0&modestbranding=1&showinfo=0&rel=0`}
            title="Música de Fundo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Cabeçalho principal */}
      <header className="bg-gradient-to-r from-custom-header to-blue py-8 md:py-12 text-center relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4">
            {isAdmin ? (
              <button
                onClick={onLogoutClick}
                className="text-rose-600 hover:text-rose-800 transition-colors font-medium"
              >
                Sair
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-rose-600 hover:text-rose-800 transition-colors font-medium"
              >
                Área do Casal
              </button>
            )}
          </div>

          <div className="flex flex-col items-center animate-fade-in">
            <Heart size={36} className="text-rose-500 mb-4" />
            <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-2">
              {coupleNames}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light mb-4">
              {weddingDate}
            </p>
            <div className="w-24 h-1 bg-rose-300 rounded my-4"></div>
            <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
              Estamos muito felizes em compartilhar este momento especial com você.
              Sua presença é o nosso maior presente, mas se você deseja nos presentear,
              criamos esta lista para facilitar sua escolha.
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;