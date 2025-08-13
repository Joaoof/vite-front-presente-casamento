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

function App() {
  // App configuration
  const coupleNames = 'João Victor & Ana Luiza';
  const weddingDate = 'Data do Casamento: 04/10/2025';

  // Authentication
  const { isAuthenticated, logout } = useAuth();

  // Gifts state and handlers
  const {
    gifts,
    addGift,
    updateGift,
    removeGift,
    reserveGift,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
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
      updateGift(giftToEdit.id, updatedGift);
      setGiftToEdit(null);
    } else {
      addGift(updatedGift);
    }
  };

  const handleReserveGift = async (id: string, reservedBy: string) => { 
    try {
      await reserveGift(id, reservedBy);
    } catch (error) {
      console.error('Erro ao reservar presente:', error);
      throw error;
    }
  };

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
        <OurStory />
        <PhotoCarousel />
        {isAuthenticated && (
          <AdminPanel
            gifts={gifts}
            onAddGift={handleSubmitEdit}
            onUpdateGift={updateGift}
            onDeleteGift={removeGift}
            giftToEdit={giftToEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}

        <GiftList
          gifts={gifts}
          isAdmin={isAuthenticated}
          onEditGift={handleEditGift}
          onDeleteGift={removeGift}
          onReserveGift={handleReserveGift}
          coupleNames={coupleNames}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
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