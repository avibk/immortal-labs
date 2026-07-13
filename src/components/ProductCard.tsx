import React from "react";
import { Product } from "../data/products";
import { Award } from "lucide-react";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onClick: (product: Product) => void;
  designPreset?: "sterile" | "midnight" | "cyber" | "swiss";
  variants?: Product[];
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

export default function ProductCard({ product, onClick, designPreset = "swiss", variants = [] }: ProductCardProps) {
  const cardContainerClass = "relative overflow-hidden bg-white border-2 border-black rounded-none transition-all duration-300 md:hover:-translate-y-0.5 md:hover:shadow-md md:hover:border-black group select-none cursor-pointer text-black flex flex-col h-full";

  const baseName = getBaseProductName(product.name);
  
  // Find minimum price among variants to show "From $XX"
  const prices = variants.length > 0 ? variants.map(v => v.price) : [product.price];
  const minPrice = Math.min(...prices);
  
  // List of all doses for this product variant group
  const potencies = variants.length > 0 
    ? variants.map(v => v.dose.split(" ")[0]) 
    : [product.dose.split(" ")[0]];

  return (
    <div
      id={`product-${product.id}`}
      className={cardContainerClass}
      onClick={() => onClick(product)}
    >
      <div className="relative bg-white flex flex-col h-full">
        {/* Quality Badge - Smaller and more minimal */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          <span className="inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black text-white border border-black rounded-none">
            HPLC {product.purity}
          </span>
        </div>

        {/* In Stock Indicator - Top Right Corner */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="inline-flex items-center gap-1 font-mono text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-600 text-white border border-emerald-600 rounded-none shadow-xs animate-pulse">
            In Stock
          </span>
        </div>

        {/* Product Image Panel - Highly compact */}
        <div className="relative aspect-[3/2] overflow-hidden border-b-2 border-black flex items-center justify-center bg-stone-50">
          <img
            src={product.image}
            alt={baseName}
            referrerPolicy="no-referrer"
            className="object-contain max-h-[85%] max-w-[85%] mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-102"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Details - Compact & Minimalist */}
        <div className="p-2 md:p-2.5 flex flex-col justify-between flex-1">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <span className="text-[10px] md:text-[11px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold uppercase tracking-wide px-1.5 py-0.5">
                CODE: {product.code}
              </span>
              <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                CAS: {product.casNumber}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-2.5">
              <h3 className="font-display font-black tracking-tight text-base md:text-lg lg:text-xl uppercase text-black line-clamp-1 group-hover:text-stone-700 transition-colors flex-1 leading-none">
                {baseName}
              </h3>
              <div className="text-right shrink-0 font-mono bg-stone-50 border border-stone-200 px-3 py-1.5 shadow-xs">
                <span className="block text-[10px] md:text-[11px] text-stone-500 uppercase font-black leading-none mb-1 tracking-wider">
                  {variants.length > 1 ? "STARTING" : "PRICE"}
                </span>
                <span className="text-xl md:text-2xl font-black text-black block leading-none">
                  {variants.length > 1 ? `$${minPrice.toFixed(0)}` : `$${product.price.toFixed(0)}`}
                </span>
              </div>
            </div>
            
            {/* Potency options tags */}
            {potencies.length > 1 && (
              <div className="pt-0.5 flex flex-wrap gap-1">
                {potencies.map((p, i) => (
                  <span key={i} className="text-[9px] md:text-[10px] font-mono bg-stone-100 text-stone-900 border border-black px-1.5 py-0.5 uppercase font-black tracking-wide shadow-xs">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
