import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer  position="top-right" autoClose={3000} />
    </StrictMode>
  </AuthProvider>
);
