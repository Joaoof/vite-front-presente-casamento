import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' // ← importa o Provider
import { useAuth } from './hooks/useAuth'
import { useGifts } from './hooks/useGifts'
import { Gift } from './types'

import Header from './components/Header'
import Footer from './components/Footer'
import GiftList from './components/GiftList'
import AdminPanel from './components/AdminPanel'
import LoginModal from './components/LoginModal'
import PhotoCarousel from './components/PhotosCarousel'
import OurStory from './components/OurStory'
import RSVP from './components/RSVP'

import './styles/animations.css'
import WelcomeBanner from './components/WelcomeBanner'

// ─── Página principal isolada ──────────────────────────────
function HomePage() {
  const coupleNames = 'Luís & Natiele'
  const weddingDate = '25 de Julho de 2026'

  const { isAuthenticated, logout } = useAuth()
  const {
    gifts, addGift, updateGift, removeGift, reserveGift,
    searchTerm, setSearchTerm, filter, setFilter,
  } = useGifts()

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null)

  const handleEditGift = (gift: Gift) => setGiftToEdit(gift)
  const handleCancelEdit = () => setGiftToEdit(null)

  const handleSubmitEdit = (data: Omit<Gift, 'id' | 'createdAt' | 'status'>) => {
    if (giftToEdit) { updateGift(giftToEdit.id, data); setGiftToEdit(null) }
    else addGift(data)
  }

  const handleReserveGift = async (id: string, reservedBy: string) => {
    try { await reserveGift(id, reservedBy) }
    catch (error) { console.error('Erro ao reservar presente:', error); throw error }
  }

  return (
    <div className="bg-custom-header min-h-screen flex flex-col font-lato">
      <WelcomeBanner />

      <Header
        coupleNames={coupleNames}
        weddingDate={weddingDate}
        isAdmin={isAuthenticated}      // ← sem !! desnecessário (já é boolean)
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={logout}
      />

      <main className="flex-grow container mx-auto">
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
  )
}

// ─── App com roteamento ────────────────────────────────────
export default function App() {
  return (
    // ✅ AuthProvider envolve tudo — useAuth() funciona em qualquer filho
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
