import React, { useState, useEffect } from "react";
import { CartItem } from "../types";
import { X, Copy, Check, ExternalLink, MessageSquare, ShieldCheck, Award, Info, AlertCircle } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCheckoutSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onCheckoutSuccess,
}: CheckoutModalProps) {
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Generate an order reference once when the modal is shown with items
  useEffect(() => {
    if (isOpen) {
      setOrderId(`IML-RE-${Math.floor(100000 + Math.random() * 900000)}`);
      setCopied(false);
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.kitType === "10kit" ? item.product.price10 * 10 : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);
  
  const total = subtotal; // No shipping cost as requested

  // Generate text for user to copy to clipboard
  const getOrderSummaryText = () => {
    const itemsText = cartItems
      .map(
        (item) =>
          `- ${item.product.name} [CODE: ${item.product.code}] (${
            item.kitType === "10kit" ? "10 KIT Bulk" : "1 KIT"
          }) x${item.quantity}`
      )
      .join("\n");
    return `IMMORTAL LABS ORDER SPECIFICATION\n==================================\nOrder Code: ${orderId}\n\nSelected Reagents:\n${itemsText}\n\nTOTAL AMOUNT: $${total.toFixed(2)}\n==================================\nPlease process this scientific research request.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getOrderSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 font-sans select-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-xl rounded-none shadow-2xl border-2 border-black overflow-hidden flex flex-col z-10 animate-scale-up max-h-[90vh]">
        
        {/* Header bar */}
        <div className="bg-black text-white p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-white" />
            <span className="font-display font-black tracking-widest text-xs uppercase text-white">TELEGRAM LOGISTICS CENTER</span>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white mobile-touch-target p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          
          <div className="text-center space-y-2">
            <h3 className="font-display font-black text-lg text-black uppercase tracking-tight">Complete Your Order</h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto font-sans">
              We have integrated our ordering desk directly with Telegram for faster clinical communication, custom validation, and logistics dispatch. <strong>No billing forms are required.</strong>
            </p>
          </div>

          {/* Steps section */}
          <div className="bg-stone-50 border border-black p-4 space-y-3 rounded-none">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest font-black">INSTRUCTIONS</span>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-black font-sans">
              <div className="flex gap-2 items-start">
                <span className="w-5 h-5 rounded-none bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Copy your generated order summary specification using the copy button below.</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="w-5 h-5 rounded-none bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Click the Telegram button to enter our active verification channel.</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="w-5 h-5 rounded-none bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Paste the order details to the representative to conclude shipping and validation.</span>
              </div>
            </div>
          </div>

          {/* Reference block */}
          <div className="border border-black p-4 bg-white space-y-3 rounded-none">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">ORDER REF: {orderId}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-black hover:text-white text-stone-800 border border-stone-200 font-mono text-[10px] font-bold rounded-none uppercase transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-stone-800" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY SUMMARY</span>
                  </>
                )}
              </button>
            </div>

            {/* List of order products */}
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const is10Kit = item.kitType === "10kit";
                const displayType = is10Kit ? "10 KIT Bulk" : "1 KIT";
                const key = `${item.product.id}-${item.kitType || "1kit"}`;
                return (
                  <div key={key} className="flex justify-between items-center text-xs font-mono text-stone-700">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold bg-stone-100 text-stone-800 px-1 py-0.5 border border-stone-200 rounded-none">{item.product.code}</span>
                      <span className="truncate max-w-[180px] font-medium text-black uppercase">{item.product.name}</span>
                      <span className="text-[10px] text-stone-500 font-bold uppercase shrink-0">({displayType})</span>
                    </div>
                    <span className="text-stone-400">x{item.quantity}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-stone-200 font-mono font-bold text-black">
              <span className="text-xs uppercase tracking-wider">TOTAL AMOUNT:</span>
              <span className="text-black font-black text-base font-geist">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="flex flex-col gap-2.5">
            <a
              href="https://t.me/astnpk"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="w-full py-4 bg-black hover:bg-stone-900 text-white text-xs font-black font-display uppercase tracking-widest rounded-none border border-black transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare className="w-4.5 h-4.5 text-white" />
              <span>Contact via Telegram Channel</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={onCheckoutSuccess}
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-black border border-black font-mono text-[11px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-black animate-pulse" />
              <span>Complete Order & Clear Cart</span>
            </button>
          </div>

          {/* Footer security trust note */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[9px] text-stone-400 font-mono">
            <Info className="w-3 h-3 text-stone-500" />
            <span>Secure scientific communications protocol enabled</span>
          </div>

        </div>

      </div>
    </div>
  );
}
