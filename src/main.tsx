import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 20,
        }}
      />
    </StrictMode>
  </AuthProvider>
);
