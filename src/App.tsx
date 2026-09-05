import React, { useState, useEffect } from 'react';
import { DayNightMode, CartItem, DisneyMerchItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CharacterStage } from './components/CharacterStage';
import { MoviesSection } from './components/MoviesSection';
import { GamesSection } from './components/GamesSection';
import { FactsSection } from './components/FactsSection';
import { HistorySection } from './components/HistorySection';
import { UpdatesSection } from './components/UpdatesSection';
import { MerchSection } from './components/MerchSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { soundFx } from './utils/audio';

export default function App() {
  // Day / Night mode state (defaults to night for magical Disney castle fireworks atmosphere)
  const [mode, setMode] = useState<DayNightMode>(() => {
    const saved = localStorage.getItem('disneyverse_mode');
    return (saved === 'day' || saved === 'night') ? saved : 'night';
  });

  // 90s VHS nostalgic scanline effect
  const [vhsMode, setVhsMode] = useState<boolean>(() => {
    return localStorage.getItem('disneyverse_vhs') === 'true';
  });

  // Procedural Web Audio FX toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundFx.enabled);

  // Cart & Magic Bag items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('disneyverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Active section & character spotlight
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeCharacterId, setActiveCharacterId] = useState<string>('mickey');

  // Sync mode changes to localStorage
  const handleToggleMode = () => {
    const nextMode: DayNightMode = mode === 'day' ? 'night' : 'day';
    setMode(nextMode);
    localStorage.setItem('disneyverse_mode', nextMode);
    soundFx.playPixieChime();
  };

  // Sync VHS mode
  const handleToggleVhs = () => {
    const nextVhs = !vhsMode;
    setVhsMode(nextVhs);
    localStorage.setItem('disneyverse_vhs', String(nextVhs));
    soundFx.playVhsClick();
  };

  // Sync sound toggle
  const handleToggleSound = () => {
    const enabled = soundFx.toggleSound();
    setSoundEnabled(enabled);
  };

  // Cart operations
  const handleAddToCart = (merch: DisneyMerchItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.merch.id === merch.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.merch.id === merch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { merch, quantity: 1 }];
      }
      localStorage.setItem('disneyverse_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateQuantity = (merchId: string, qty: number) => {
    setCartItems((prev) => {
      let updated: CartItem[];
      if (qty <= 0) {
        updated = prev.filter((item) => item.merch.id !== merchId);
      } else {
        updated = prev.map((item) =>
          item.merch.id === merchId ? { ...item, quantity: qty } : item
        );
      }
      localStorage.setItem('disneyverse_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveItem = (merchId: string) => {
    soundFx.playPop();
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.merch.id !== merchId);
      localStorage.setItem('disneyverse_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('disneyverse_cart');
  };

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTriggerCharacterAction = (charId: string) => {
    setActiveCharacterId(charId);
    handleNavigate('characters');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen relative selection:bg-amber-400 selection:text-slate-900 transition-colors duration-700 ${
      mode === 'day' ? 'bg-sky-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* 90s Authentic VHS Scanline Overlay */}
      {vhsMode && (
        <div className="fixed inset-0 retro-vhs-scanlines z-40 pointer-events-none opacity-80" />
      )}

      {/* Main Navbar */}
      <Navbar
        mode={mode}
        onToggleMode={handleToggleMode}
        vhsMode={vhsMode}
        onToggleVhs={handleToggleVhs}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* 1. First Homepage Hero with Day/Night Dynamic Visuals & Castle */}
        <Hero
          mode={mode}
          onToggleMode={handleToggleMode}
          onNavigate={handleNavigate}
          onTriggerCharacterAction={handleTriggerCharacterAction}
        />

        {/* 2. Interactive Animated Disney Characters */}
        <CharacterStage
          mode={mode}
          activeCharacterId={activeCharacterId}
          onSelectCharacter={(id) => setActiveCharacterId(id)}
        />

        {/* 3. Disney Movies & 90s VHS Clamshell Vault */}
        <MoviesSection
          mode={mode}
          vhsMode={vhsMode}
        />

        {/* 4. Playable Disney Mini-Games */}
        <GamesSection
          mode={mode}
        />

        {/* 5. Mind-Blowing Disney Facts & Animation Secrets */}
        <FactsSection
          mode={mode}
        />

        {/* 6. Disney Updates & News Ticker */}
        <UpdatesSection
          mode={mode}
        />

        {/* 7. 100+ Years History & 90s Renaissance Deep-Dive */}
        <HistorySection
          mode={mode}
        />

        {/* 8. Retro 90s Disney Store Merch & Collectibles */}
        <MerchSection
          mode={mode}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </main>

      {/* Slide-over Magic Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        mode={mode}
      />

      {/* Footer */}
      <Footer
        mode={mode}
        onNavigate={handleNavigate}
        onToggleMode={handleToggleMode}
      />
    </div>
  );
}
