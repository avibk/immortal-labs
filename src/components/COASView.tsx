import React, { useState } from "react";
import { ShieldCheck, Eye, Download, X, HelpCircle, FileCheck2, ZoomIn } from "lucide-react";

// @ts-ignore
import coaRetatrutide from "../assets/images/coa_retatrutide_1783931951786.jpg";
// @ts-ignore
import coaHgh from "../assets/images/coa_hgh_1783931964146.jpg";
// @ts-ignore
import coaTesamorelin from "../assets/images/coa_tesamorelin_1783931975648.jpg";

interface COAItem {
  id: string;
  title: string;
  substance: string;
  lab: string;
  purity: string;
  quantity: string;
  date: string;
  taskNumber: string;
  imageSrc: string;
  description: string;
}

const COAS: COAItem[] = [
  {
    id: "RT10",
    title: "Retatrutide 10mg (RT10)",
    substance: "Retatrutide",
    lab: "Janoshik Analytical Sciences",
    purity: "99.037%",
    quantity: "10.63 mg",
    date: "11 SEP 2025",
    taskNumber: "#78200",
    imageSrc: coaRetatrutide,
    description: "Third-party high-performance liquid chromatography (HPLC) test report. Validates active compound identification, 10.63 mg filled mass, and an exceptional purity tier of 99.037% with zero detected contaminants.",
  },
  {
    id: "HGH15",
    title: "HGH 15 IU (Human Growth Hormone)",
    substance: "Human Growth Hormone",
    lab: "Vanguard Laboratory",
    purity: "99.08% ± 0.18%",
    quantity: "16.86 IU",
    date: "28 MAY 2026",
    taskNumber: "V260522-14 001",
    imageSrc: coaHgh,
    description: "ISO/IEC 17025 accredited Certificate of Analysis. Confirms a chromatographic purity level of 99.08% and active substance yield of 16.86 IU, surpassing the target specifications of 15 IU with excellent stability.",
  },
  {
    id: "TESA10",
    title: "Tesamorelin 10mg",
    substance: "Tesamorelin",
    lab: "Janoshik Analytical Sciences",
    purity: "99.424%",
    quantity: "10.62 mg",
    date: "28 APR 2025",
    taskNumber: "#63322",
    imageSrc: coaTesamorelin,
    description: "Quantitative purity assessment by Janoshik. Demonstrates high-tier chemical homogeneity at 99.424% purity and 10.62 mg absolute active mass per vial, verifying standard-setting laboratory excellence.",
  }
];

export default function COASView() {
  const [activeModalImage, setActiveModalImage] = useState<COAItem | null>(null);

  return (
    <div className="space-y-10 animate-fade-in text-stone-900 pb-16 select-none" id="coas-section-container">
      {/* Elegant Editorial Page Header */}
      <div className="border-b-2 border-black pb-5" id="coas-header">
        <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 font-bold block mb-1">
          Immortal Labs Integrity Assurance // Third Party Validation
        </span>
        <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-black">
          CERTIFICATES OF ANALYSIS (COAs)
        </h2>
        <p className="text-xs md:text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          We maintain absolute batch transparency. Every synthesized reference compound undergoes rigorous high-performance liquid chromatography (HPLC) and mass spectrometry analysis by independent specialized labs to confirm purity and quantity parameters.
        </p>
      </div>

      {/* Grid Layout of Pictures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="coas-grid">
        {COAS.map((coa) => (
          <div 
            key={coa.id}
            id={`coa-card-${coa.id}`}
            className="border-2 border-black bg-white hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between group h-full overflow-hidden"
          >
            {/* Image Preview Container */}
            <div className="relative border-b-2 border-black bg-stone-100 aspect-[3/4] overflow-hidden cursor-pointer flex items-center justify-center"
                 onClick={() => setActiveModalImage(coa)}>
              <img 
                src={coa.imageSrc} 
                alt={coa.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Inspect Sheet
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 border border-white flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                VERIFIED
              </div>
            </div>

            {/* Description & Metadata Section */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-500">
                  <span>{coa.lab}</span>
                  <span className="font-bold text-black">{coa.date}</span>
                </div>
                
                <h3 className="font-display font-black text-base uppercase text-black leading-tight tracking-tight">
                  {coa.title}
                </h3>
                
                <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
                  {coa.description}
                </p>
              </div>

              {/* Specs Badge Strip */}
              <div className="border-t border-stone-200 pt-4 font-mono text-[11px] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">PURITY RATING:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5">{coa.purity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">ACTIVE DOSAGE:</span>
                  <span className="text-stone-900 font-bold">{coa.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">LAB REF / TASK:</span>
                  <span className="text-stone-900 font-bold">{coa.taskNumber}</span>
                </div>
              </div>
            </div>

            {/* Inspect Button Footer */}
            <div className="p-4 bg-stone-50 border-t border-black flex gap-2">
              <button 
                onClick={() => setActiveModalImage(coa)}
                className="w-full bg-black hover:bg-stone-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-2.5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                View Full Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Zoom Modal Overlay */}
      {activeModalImage && (
        <div 
          id="coa-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setActiveModalImage(null)}
        >
          <div 
            id="coa-modal-content"
            className="bg-white border-2 border-black max-w-3xl w-full flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center border-b border-black">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4.5 h-4.5 text-emerald-400" />
                <span className="font-mono text-xs md:text-sm uppercase tracking-wider font-bold">
                  {activeModalImage.title}
                </span>
              </div>
              <button 
                onClick={() => setActiveModalImage(null)}
                className="text-stone-400 hover:text-white font-mono text-xs font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors"
              >
                Close <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-stone-100 flex items-center justify-center min-h-0">
              <img 
                src={activeModalImage.imageSrc} 
                alt={activeModalImage.title} 
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[60vh] object-contain shadow-md border border-stone-300"
              />
            </div>

            {/* Modal Description Footer */}
            <div className="p-5 border-t-2 border-black bg-white space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <h4 className="font-display font-black text-sm uppercase text-black leading-tight">
                    {activeModalImage.title}
                  </h4>
                  <p className="text-[10px] font-mono text-stone-500 uppercase mt-0.5">
                    Analyzed by: <strong>{activeModalImage.lab}</strong> // TASK {activeModalImage.taskNumber}
                  </p>
                </div>
                <div className="flex gap-4 font-mono text-xs shrink-0 bg-stone-50 border border-stone-250 p-2">
                  <div>
                    <span className="text-stone-400 block text-[9px]">PURITY</span>
                    <strong className="text-emerald-700">{activeModalImage.purity}</strong>
                  </div>
                  <div className="border-l border-stone-300 pl-4">
                    <span className="text-stone-400 block text-[9px]">DOSAGE</span>
                    <strong className="text-black">{activeModalImage.quantity}</strong>
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {activeModalImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
