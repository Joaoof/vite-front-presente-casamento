import React, { useState } from 'react';
import { X, Lock, User, Heart } from 'lucide-react';
import Toast from './Toast';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { login } = useAuth();

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      // Reset form
      setUsername('');
      setPassword('');
      setError('');
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await api.login(username, password);
      login(data.accessToken);

      // Show professional success notification
      setShowToast(true);

      // Close modal after showing success message
      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
        {/* Modal */}
        <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-rose-50 to-rose-100 px-6 py-8 text-center">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-white/50 rounded-full"
              disabled={isLoading}
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-3">
              <div className="bg-rose-100 p-3 rounded-full">
                <Heart className="text-rose-500" size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-gray-800 mb-1">Área do Casal</h2>
            <p className="text-sm text-gray-600">Acesse sua lista de presentes exclusiva</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              <div>
                <label className="text-sm flex justify-start font-medium text-gray-700 mb-2" htmlFor="username">
                  Usuário
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-gray-400"
                    placeholder="Digite seu usuário"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium  flex justify-start text-gray-700 mb-2" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-gray-400"
                    placeholder="Digite sua senha"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm py-3 px-4 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Autenticando...
                  </div>
                ) : (
                  'Acessar Área do Casal'
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Apenas noivos autorizados podem acessar esta área
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Professional Toast Notification */}
      <Toast
        show={showToast}
        message="Autenticação realizada com sucesso! Redirecionando..."
        type="success"
        duration={2000}
        onClose={handleToastClose}
        position="top-center"
      />
    </>
  );
};

export default LoginModal;