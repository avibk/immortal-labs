import { useState, TouchEvent } from "react";
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
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [sheetOffset, setSheetOffset] = useState<number>(0);

  // Swipe-down to close on mobile grab-handle
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY;
    if (diffY > 0) {
      setSheetOffset(diffY);
    }
  };

  const handleTouchEnd = () => {
    if (sheetOffset > 80) {
      onClose();
    }
    setSheetOffset(0);
    setTouchStartY(null);
  };

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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* MOBILE BOTTOM SHEET (< 768px): covers 85% height to prevent cutoff, slides up, swipe down to close */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col md:hidden bottom-sheet-transition border-t border-slate-200"
        style={{
          height: "85vh",
          transform: `translateY(${sheetOffset}px)`,
        }}
      >
        {/* Grab Handle for Swiping */}
        <div 
          className="w-full py-3 flex flex-col items-center cursor-row-resize select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-1" />
          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase">SWIPE DOWN TO CLOSE CART</span>
        </div>

        {/* Content of Bottom Sheet */}
        <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h2 className="text-sm font-display font-bold text-slate-900 uppercase tracking-tight">Active Formula Cart</h2>
          </div>
          <span className="text-xs font-mono font-medium text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">
            {cartItems.length} Compounds
          </span>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <span className="text-4xl">🧪</span>
              <p className="mt-2 text-xs font-mono font-semibold text-slate-400">NO ITEMS LOADED</p>
              <p className="text-[11px] text-slate-400 mt-1">Select diagnostic standards to queue for laboratory shipping.</p>
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
                    className="w-12 h-12 object-cover rounded bg-slate-50 border border-slate-150" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 truncate font-display">{item.product.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400 font-medium">
                      CODE: {item.product.code} | TYPE: {displayType} | ${unitPrice.toFixed(2)}
                    </p>
                    
                    {/* Picker */}
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", -1)}
                          className="mobile-touch-target w-8 h-8 flex items-center justify-center text-slate-500 hover:text-cyan-600 font-bold cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-800 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", 1)}
                          className="mobile-touch-target w-8 h-8 flex items-center justify-center text-slate-500 hover:text-cyan-600 font-bold cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.product.id, item.kitType || "1kit")}
                        className="text-red-500 hover:text-red-700 mobile-touch-target p-1"
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
          <div className="bg-slate-50 border-t border-slate-200 p-4 pb-6 space-y-3">
            <div className="space-y-1.5 font-mono text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>TOTAL AMOUNT:</span>
                <span className="text-cyan-800 font-bold text-xs">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={onOpenCheckout}
              className="w-full py-3.5 bg-cyan-700 text-white text-xs font-black font-display uppercase tracking-widest rounded-lg shadow-md hover:bg-cyan-800 active:bg-cyan-900 transition-all cursor-pointer mobile-touch-target flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-cyan-200" />
              <span>CHECKOUT & PURCHASE NOW</span>
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP RIGHT DRAWER (> 1024px): sliding in from the right */}
      <div
        className="absolute top-0 right-0 bottom-0 bg-white shadow-2xl hidden md:flex flex-col border-l border-slate-200 w-full max-w-md animate-slide-in-right"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-base font-display font-bold uppercase tracking-wider">Active Formula Cart</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer mobile-touch-target"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content of Desktop Drawer */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 px-6">
              <span className="text-5xl mb-3">🔬</span>
              <p className="text-xs font-mono font-bold text-slate-400 tracking-wider">NO COMPOUNDS DETECTED</p>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                Your molecular synthesis ledger is currently vacant. Double click compound cards on the catalog shelf to review specifications and insert high-purity formulas here.
              </p>
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
                    className="w-14 h-14 object-cover rounded-md bg-slate-50 border border-slate-200" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-900 truncate font-display tracking-tight pr-2">{item.product.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          <span className="text-[9px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded uppercase inline-block">
                            CODE: {item.product.code}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded uppercase inline-block">
                            {displayType} ({item.product.dose})
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.product.id, item.kitType || "1kit")}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                        Purity: {item.product.purity}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">${(unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity picker */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono text-slate-400">QTY:</span>
                      <div className="flex items-center border border-slate-200 rounded bg-slate-50">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", -1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-cyan-600 font-bold transition-colors cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-800 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.kitType || "1kit", 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-cyan-600 font-bold transition-colors cursor-pointer"
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
          <div className="bg-slate-50 border-t border-slate-200 p-6 space-y-4 shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
            {/* Real-time statistics calculations */}
            <div className="space-y-2 font-mono text-xs text-slate-600">
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>TOTAL AMOUNT:</span>
                <span className="text-cyan-700 font-bold text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* High trust security badges */}
            <div className="bg-white border border-slate-200 rounded-md p-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 font-semibold">
                <Lock className="w-3.5 h-3.5 text-cyan-600" />
                <span>SECURE ENCRYPTED AES-256 CHECKOUT</span>
              </div>
              <div className="flex items-center gap-2 justify-between border-t border-slate-100 pt-2 text-[9px] text-slate-400 font-mono">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /> cGMP Audited</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-cyan-500" /> Cold-Chain Shipped</span>
                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3 text-slate-500" /> Card & Crypto</span>
              </div>
            </div>

            <button 
              onClick={onOpenCheckout}
              className="w-full py-4 bg-slate-950 hover:bg-cyan-700 text-white text-xs font-black font-display uppercase tracking-widest rounded-lg shadow-md hover:shadow-cyan-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-cyan-300" />
              <span>CHECKOUT & PURCHASE NOW</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
