import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const initialState: AuthContextType = {
  accessToken: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  login: () => { },
  logout: () => { },
};

export const AuthContext = createContext<AuthContextType>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Validação inicial do token (opcional)
    const validateToken = async () => {
      try {
        // Aqui você pode adicionar uma rota `/auth/me` pra validar o token
        setState({
          accessToken: state.accessToken,
          isAuthenticated: !!state.accessToken,
          isLoading: false,
        });
      } catch (error) {
        logout();
      }
    };

    validateToken();
  }, []);

  const login = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    setState({
      accessToken: accessToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setState({
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
};