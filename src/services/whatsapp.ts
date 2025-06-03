import { Gift } from '../types';

export const openWhatsApp = (gift: Gift, coupleNames: string): void => {
  const message = encodeURIComponent(
    `Olá! Gostaria de presentear vocês com "${gift.name}" do seu registro de casamento. Por favor, confirme se este presente ainda está disponível. Obrigado!`
  );
  
  // Use WhatsApp web API to open a new chat with predefined message
  // Note: This requires the user to have a phone number set up for the registry
  window.open(`https://wa.me/?text=${message}`, '_blank');
};