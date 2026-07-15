import { useState } from "react";
import { CartItem } from "../types";
import { X, Plus, Minus, Trash2, ShieldCheck, Lock, Truck, CreditCard } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, kitType: "1kit" | "10kit", delta: number) => void;
  onRemoveItem: (id: string, kitType: "1kit" | "10kit") => void;
  onOpenCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}: CartDrawerProps) {
  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.kitType === "10kit" ? item.product.price10 * 10 : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);
  const total = subtotal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* MOBILE BOTTOM SHEET (< 768px): covers 85% height to prevent cutoff, slides up, close via X button */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl flex flex-col md:hidden bottom-sheet-transition border-t-2 border-black"
        style={{
          height: "85vh",
        }}
      >
        {/* Mobile Header matching desktop dark theme, rounded top corners */}
        <div className="p-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-white animate-pulse" />
            <h2 className="text-sm font-display font-black uppercase tracking-wider">Active Formula Cart</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-white bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-none">
              {cartItems.length} Compounds
            </span>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 hover:bg-stone-950 transition-colors cursor-pointer mobile-touch-target"
              title="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-stone-200 bg-white">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <span className="text-4xl mb-2">🧪</span>
              <p className="text-sm font-bold text-stone-500 font-display uppercase tracking-wider">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const is10Kit = item.kitType === "10kit";
              const unitPrice = is10Kit ? item.product.price10 * 10 : item.product.price;
              const displayType = is10Kit ? "10 KIT (Bulk)" : "1 KIT";
              const key = `${item.product.id}-${item.kitType || "1kit"}`;
              return (
                <div key={key} className="py-3 flex gap-3 items-center">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-none bg-stone-50 border border-black" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-black truncate font-display uppercase">{item.product.name}</h4>
                    <p className="text-[10px] font-mono text-stone-500 font-medium">
                      CODE: {item.product.code} | TYPE: {displayType} | ${unitPrice.toFixed(2)}
                    </p>
                    
                    {/* Picker */}
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center border border-black rounded-none bg-stone-50">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", -1)}
                          className="mobile-touch-target w-8 h-8 flex items-center justify-center text-black hover:bg-stone-100 font-bold cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-black w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", 1)}
                          className="mobile-touch-target w-8 h-8 flex items-center justify-center text-black hover:bg-stone-100 font-bold cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.product.id, item.kitType || "1kit")}
                        className="text-stone-500 hover:text-black mobile-touch-target p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Mobile Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t-2 border-black p-4 pb-6 space-y-3">
            <div className="space-y-1.5 font-mono text-[11px] text-black">
              <div className="flex justify-between font-bold">
                <span>TOTAL AMOUNT:</span>
                <span className="text-black font-black text-xs font-geist">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={onOpenCheckout}
              className="w-full py-3.5 bg-black text-white text-xs font-black font-display uppercase tracking-widest rounded-none border border-black hover:bg-white hover:text-black transition-all cursor-pointer mobile-touch-target flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-white" />
              <span>CHECKOUT & PURCHASE NOW</span>
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP RIGHT DRAWER (> 1024px): sliding in from the right */}
      <div
        className="absolute top-0 right-0 bottom-0 bg-white shadow-2xl hidden md:flex flex-col border-l-2 border-black w-full max-w-md animate-slide-in-right animate-duration-200"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b-2 border-black flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-white animate-pulse" />
            <h2 className="text-base font-display font-black uppercase tracking-wider">Active Formula Cart</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-none hover:bg-stone-900 transition-colors cursor-pointer mobile-touch-target"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content of Desktop Drawer */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-200 bg-white">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
              <span className="text-5xl mb-3">🔬</span>
              <p className="text-sm font-bold text-stone-500 font-display uppercase tracking-wider">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const is10Kit = item.kitType === "10kit";
              const unitPrice = is10Kit ? item.product.price10 * 10 : item.product.price;
              const displayType = is10Kit ? "10 KIT (Bulk)" : "1 KIT";
              const key = `${item.product.id}-${item.kitType || "1kit"}`;
              return (
                <div key={key} className="py-4 flex gap-4 items-center">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-none bg-stone-50 border border-black" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <h4 className="text-xs font-black text-black truncate font-display tracking-tight pr-2 uppercase">{item.product.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          <span className="text-[9px] font-mono font-bold text-black bg-stone-100 px-1.5 py-0.5 border border-stone-200 uppercase inline-block">
                            CODE: {item.product.code}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-black bg-stone-50 border border-stone-300 px-1.5 py-0.5 uppercase inline-block">
                            {displayType} ({item.product.dose})
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.product.id, item.kitType || "1kit")}
                        className="text-stone-400 hover:text-black transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
                        Purity: {item.product.purity}
                      </span>
                      <span className="text-xs font-mono font-black text-black font-geist">${(unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity picker */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono text-stone-400">QTY:</span>
                      <div className="flex items-center border border-black rounded-none bg-stone-50">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", -1)}
                          className="w-7 h-7 flex items-center justify-center text-black hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-black w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", 1)}
                          className="w-7 h-7 flex items-center justify-center text-black hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Secure Clinical Payment Badges & Calculations Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t-2 border-black p-6 space-y-4">
            {/* Real-time statistics calculations */}
            <div className="space-y-2 font-mono text-xs text-black">
              <div className="flex justify-between text-sm font-bold">
                <span>TOTAL AMOUNT:</span>
                <span className="text-black font-black text-base font-geist">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* High trust security badges */}
            <div className="bg-stone-50 border border-black p-3 flex flex-col gap-2 rounded-none">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-black font-bold uppercase">
                <Lock className="w-3.5 h-3.5 text-black" />
                <span>SECURE ENCRYPTED AES-256 CHECKOUT</span>
              </div>
              <div className="flex items-center gap-2 justify-between border-t border-stone-200 pt-2 text-[9px] text-stone-600 font-mono font-bold">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-black" /> cGMP Audited</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-black" /> Cold-Chain Shipped</span>
                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3 text-black" /> Card & Crypto</span>
              </div>
            </div>

            <button 
              onClick={onOpenCheckout}
              className="w-full py-4 bg-black hover:bg-stone-900 text-white text-xs font-black font-display uppercase tracking-widest rounded-none border border-black transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-white" />
              <span>CHECKOUT & PURCHASE NOW</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
