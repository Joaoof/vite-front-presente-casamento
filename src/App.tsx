import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useGifts } from './hooks/useGifts';
import { Gift } from './types';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import GiftList from './components/GiftList';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';

// Custom styles
import './styles/animations.css';
import PhotoCarousel from './components/PhotosCarousel';
import OurStory from './components/OurStory';
import { api } from './services/api';

function App() {
  // App configuration
  const coupleNames = 'João Victor & Ana Luiza';
  const weddingDate = 'Data do Casamento: 20/01/2024';

  // Authentication
  const { isAuthenticated, login, logout } = useAuth();

  // Gifts state and handlers
  const {
    gifts,
    addGift,
    updateGift,
    removeGift,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter, reserveGift
  } = useGifts();

  // UI state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  // Event handlers
  const handleEditGift = (gift: Gift) => {
    setGiftToEdit(gift);
  };

  const handleCancelEdit = () => {
    setGiftToEdit(null);
  };

  const handleSubmitEdit = (updatedGift: Omit<Gift, 'id' | 'createdAt' | 'status'>) => {
    if (giftToEdit) {
      if (updatedGift.reservedBy) {
        if (updateGift) {
          updateGift(giftToEdit.id, updatedGift.reservedBy);
        } else {
          console.error('updateGift is undefined');
        }
      } else {
        console.error('reservedBy is undefined');
      }
      setGiftToEdit(null);
    } else {
      if (addGift) {
        addGift(updatedGift);
      } else {
        console.error('addGift is undefined');
      }
    }
  };

  const handleReserve = async (id: string, reservedBy: string) => {
    try {
      await reserveGift(id, reservedBy);
    } catch (error) {
      console.error('Erro ao reservar:', error);
    }
  };

  // const handleLogin = (password: string) => {
  //   return login(password);
  // };

  return (
    <div className="bg-custom-header min-h-screen flex flex-col font-lato">
      <Header
        coupleNames={coupleNames}
        weddingDate={weddingDate}
        isAdmin={!!isAuthenticated}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={logout}
      />

      <main className="flex-grow container mx-auto px-8 py-4">
        <PhotoCarousel />
        <OurStory />
        {isAuthenticated && (
          <AdminPanel
            onAddGift={handleSubmitEdit}
            giftToEdit={giftToEdit}
            onCancelEdit={handleCancelEdit} gifts={[]} onUpdateGift={function (id: string, gift: Partial<Gift>): void {
              throw new Error('Function not implemented.');
            }} onDeleteGift={function (id: string): void {
              throw new Error('Function not implemented.');
            }} />
        )}

        <GiftList
          gifts={gifts}
          isAdmin={isAuthenticated}
          onEditGift={handleEditGift}
          onDeleteGift={removeGift}
          onReserveGift={(id: string, reservedBy: string) => { return handleReserve(id, reservedBy); }}
          coupleNames={coupleNames}
          searchTerm={searchTerm ?? ''}
          onSearchChange={setSearchTerm ?? (() => { })}
          filter={filter ?? "all"}
          onFilterChange={setFilter}
        />
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default App;