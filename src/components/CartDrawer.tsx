import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  mode: DayNightMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  mode,
}) => {
  if (!isOpen) return null;
  const isDay = mode === 'day';

  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.merch.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'DISNEY90S') {
      soundFx.playFanfare();
      setDiscountPercent(20);
      setPromoMessage('✨ 90s Magic Promo applied: 20% off your entire bag!');
    } else {
      soundFx.playPop();
      setPromoMessage('Try code DISNEY90S for 20% off vintage magic!');
    }
  };

  const handleCheckout = () => {
    soundFx.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
      <div 
        className={`w-full max-w-md h-full flex flex-col justify-between border-l shadow-2xl transition-all ${
          isDay 
            ? 'bg-white text-slate-900 border-sky-200' 
            : 'bg-slate-950 text-slate-100 border-amber-400/30'
        }`}
      >
        {/* Drawer Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDay ? 'bg-sky-50 border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold font-disney-title">
              Your Magic Disney Bag
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-500 font-bold">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </div>

          <button
            id="close-cart-btn"
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isOrdered ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-5xl">🏰</span>
              <h4 className="text-2xl font-black font-disney-title text-amber-400">
                Order Cast Successfully!
              </h4>
              <p className="text-xs text-slate-400">
                Tinker Bell has sealed your 90s vintage merchandise package. May your days be filled with Disney magic!
              </p>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950"
              >
                Back to Kingdom
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-2xl">
                🛍️
              </div>
              <p className="font-semibold text-sm">Your Magic Bag is empty!</p>
              <p className="text-xs max-w-xs mx-auto">
                Explore the 90s Disney Store vault below to add authentic retro collectibles, VHS tapes, and apparel.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.merch.id}
                className={`p-3 rounded-2xl border flex items-center gap-3 ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <img
                  src={item.merch.image}
                  alt={item.merch.name}
                  className="w-16 h-16 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">
                    {item.merch.name}
                  </h4>
                  <div className="text-xs text-amber-500 font-bold mt-0.5">
                    ${item.merch.price.toFixed(2)}
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.merch.id, item.quantity - 1)}
                      className="p-1 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.merch.id, item.quantity + 1)}
                      className="p-1 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.merch.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && !isOrdered && (
          <div className={`p-5 border-t space-y-4 ${
            isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (Try DISNEY90S)"
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border uppercase focus:outline-none ${
                  isDay ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className="text-xs font-bold text-amber-500 animate-fade-in">
                {promoMessage}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-500 font-bold">
                  <span>90s Vintage Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Magical Amount</span>
                <span className="text-amber-500 text-base font-black">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="checkout-order-btn"
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Cast Checkout With Pixie Dust</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
