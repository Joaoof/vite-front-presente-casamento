import React from 'react';
import { Heart } from 'lucide-react';

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
  return (
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
  );
};

export default Header;