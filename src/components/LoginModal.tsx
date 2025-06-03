import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { X } from 'phosphor-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Estado para controlar animação de saída
  const { login } = useAuth();

  if (!isOpen && !isClosing) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await api.login(username, password);
      login(data.accessToken);

      // Iniciar animação de fechamento
      setIsClosing(true);

      // Aguardar a animação terminar antes de fechar
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300); // Tempo da animação em ms
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsClosing(true);
          setTimeout(() => {
            onClose();
            setIsClosing(false);
          }, 300);
        }
      }}
    >
      <div
        className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif text-gray-800">Área do Casal</h2>
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                onClose();
                setIsClosing(false);
              }, 300);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
              disabled={isLoading}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-200 ${isLoading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'
              }`}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;