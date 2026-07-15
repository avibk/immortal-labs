import { useState, useEffect } from "react";
import { Product, products } from "../data/products";
import { X, Award, ShieldCheck, Thermometer, FlaskConical, Database, Layers } from "lucide-react";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, kitType: "1kit" | "10kit") => void;
}

function getBaseProductName(name: string): string {
  if (name.includes("Semaglutide")) return "Semaglutide";
  if (name.includes("Tirzepatide")) return "Tirzepatide";
  if (name.includes("Retatrutide")) return "Retatrutide";
  if (name.includes("HGH")) return "HGH";
  if (name.includes("BPC-157") && name.includes("TB-500") && name.includes("Blend") && !name.includes("GHK-Cu")) {
    return "BPC-157 + TB-500 Blend";
  }
  if (name.includes("GHK-Cu") && name.includes("TB-500") && name.includes("BPC-157")) {
    return "GHK-Cu + TB-500 + BPC-157 Blend";
  }
  if (name.includes("CJC-1295") && name.includes("Ipamorelin")) {
    return "CJC-1295 + Ipamorelin Blend";
  }
  if (name.includes("BPC-157")) return "BPC-157";
  if (name.includes("TB-500")) return "TB-500";
  if (name.includes("GHK-Cu")) return "GHK-Cu";
  if (name.includes("CJC-1295 without DAC")) return "CJC-1295 without DAC";
  if (name.includes("CJC-1295 With DAC")) return "CJC-1295 With DAC";
  if (name.includes("Tesamorelin")) return "Tesamorelin";
  return name;
}

export default function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  const [activeViewProduct, setActiveViewProduct] = useState<Product | null>(null);
  const [selectedKit, setSelectedKit] = useState<"1kit" | "10kit">("1kit");

  // Reset active product & selected kit when prop changes
  useEffect(() => {
    setActiveViewProduct(product);
    setSelectedKit("1kit");
  }, [product]);

  if (!product || !activeViewProduct) return null;

  const baseName = getBaseProductName(activeViewProduct.name);
  
  // Find all variants for this base product
  const variants = products.filter(p => getBaseProductName(p.name) === baseName);

  const currentUnitPrice = selectedKit === "10kit" ? activeViewProduct.price10 : activeViewProduct.price;
  const currentTotalPrice = selectedKit === "10kit" ? activeViewProduct.price10 * 10 : activeViewProduct.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans select-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl border-2 border-black overflow-hidden flex flex-col md:flex-row z-10 animate-scale-up max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-stone-500 hover:text-black bg-stone-100 hover:bg-stone-200 p-1.5 rounded-none border border-black transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Chemical Image Panel */}
        <div className="bg-stone-50 md:w-1/2 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-black relative overflow-hidden shrink-0">
          <div className="absolute inset-0 clinical-grid opacity-30 pointer-events-none" />
          
          <div className="absolute top-4 left-4 flex gap-1 z-10">
            <span className="bg-black text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-xs">
              HPLC COA Certified
            </span>
          </div>
          <img 
            src={activeViewProduct.image} 
            alt={baseName}
            className="w-40 h-40 object-contain mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105 z-10" 
          />
          <div className="mt-4 text-center z-10 flex flex-col items-center gap-2 w-full max-w-[200px]">
            <span className="text-[10px] font-mono text-black bg-stone-100 px-3 py-1 rounded-none font-bold uppercase tracking-wider border border-black">
              {activeViewProduct.category}
            </span>
            <div className="flex flex-col gap-1 w-full">
              <div className="text-[11px] font-mono font-black text-white bg-cyan-800 border border-cyan-950 px-2 py-1 rounded-none inline-block uppercase tracking-wide shadow-sm">
                PRODUCT CODE: {activeViewProduct.code}
              </div>
              <div className="text-[10px] font-mono text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded-none inline-block">
                CAS INDEX ID: {activeViewProduct.casNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Spec Sheets */}
        <div className="p-6 md:w-1/2 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[90vh]">
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-black">
              <FlaskConical className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">LABORATORY SPEC SHEET</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <span className="font-mono text-[11px] font-black bg-cyan-700 text-white px-2 py-0.5 border border-cyan-800">
                CODE: {activeViewProduct.code}
              </span>
              <span className="font-mono text-[10px] font-bold bg-black text-white px-2 py-0.5 border border-black">
                HPLC {activeViewProduct.purity}
              </span>
            </div>

            <h2 className={`font-display font-black text-stone-900 leading-tight mb-1 uppercase ${
              baseName.length > 25 
                ? "text-[15px] md:text-base" 
                : "text-lg"
            }`}>
              {baseName}
            </h2>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="font-mono text-[10px] font-black text-white bg-cyan-700 border border-cyan-800 py-0.5 px-2 inline-block uppercase tracking-wider">
                CODE: {activeViewProduct.code}
              </span>
              <span className="font-mono text-[10px] text-stone-500 bg-stone-50 border border-stone-200 py-0.5 px-2 inline-block">
                SPEC SIZE: {activeViewProduct.dose}
              </span>
            </div>

            {/* Potency Variant Selector */}
            {variants.length > 1 && (
              <div className="mb-4">
                <span className="text-[10px] block font-mono text-stone-500 uppercase tracking-widest font-bold mb-1.5">
                  Select Compound Potency
                </span>
                <div className="flex flex-wrap gap-1.5 p-1 border border-black bg-stone-50">
                  {variants.map((v) => {
                    const potencyLabel = v.dose.split(" ")[0];
                    const isSelected = v.id === activeViewProduct.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setActiveViewProduct(v);
                        }}
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-black text-white border-black"
                            : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        {potencyLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price display */}
            <div className="mb-4 bg-stone-50 border border-stone-200 p-2.5 flex justify-between items-center">
              <div>
                <span className="text-[9px] block font-mono text-stone-400">LEDGER UNIT VALUE</span>
                <span className="text-xs font-mono font-bold text-stone-600">
                  ${currentUnitPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] block font-mono text-cyan-600 font-bold uppercase">Estimated Debit</span>
                <span className="text-sm font-mono font-bold text-stone-900">
                  ${currentTotalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 mb-4 text-xs">
              <span className="text-[10px] block font-mono text-stone-500 uppercase tracking-widest font-bold">PHARMACOLOGICAL SUMMARY</span>
              <p className="text-stone-800 leading-relaxed font-sans text-[11px]">
                {activeViewProduct.description}
              </p>
            </div>

            {/* Storage Guidance */}
            <div className="bg-stone-50 border border-black rounded-none p-2.5 flex gap-2 items-start text-[10px] leading-relaxed mb-6">
              <Thermometer className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
              <div className="text-stone-700 font-mono">
                <strong>Storage:</strong> {activeViewProduct.storage}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(activeViewProduct, selectedKit);
              onClose();
            }}
            className="w-full py-3 bg-black hover:bg-stone-800 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-none border-2 border-black transition-all cursor-pointer flex items-center justify-center gap-2 mobile-touch-target mt-2"
          >
            <FlaskConical className="w-4 h-4 text-white" />
            <span>add to cart</span>
          </button>
        </div>

      </div>
    </div>
  );
}
