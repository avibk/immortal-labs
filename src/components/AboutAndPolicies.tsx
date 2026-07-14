import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Globe, HelpCircle, FileText } from "lucide-react";

export function AboutAndPolicies() {
  const [openPolicy, setOpenPolicy] = useState<string | null>(null);

  const togglePolicy = (policy: string) => {
    setOpenPolicy(openPolicy === policy ? null : policy);
  };

  const policies = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <ShieldCheck className="w-4 h-4 text-stone-600" />,
      content: "At Immortal Labs, we maintain strict data handling standards. All institutional transactions, correspondence details, and shipping records are secured via multi-layered AES-256 encryption. We enforce a robust anti-telemetry protocol and never disclose, sell, or trade laboratory inquiry details or private customer profiles to commercial advertising entities."
    },
    {
      id: "refund",
      title: "Refund Policy",
      icon: <HelpCircle className="w-4 h-4 text-stone-600" />,
      content: "Due to the specialized nature, strict cold-chain requirements, and absolute sterile standard of our lyophilized biological reference compounds, chemical reagents cannot be returned, re-stocked, or refunded after laboratory dispatch. In the exceptional event of physical carrier damage or analytical diagnostic standard discrepancy, please submit your verified HPLC chromatography/mass-spectrometry logs within 14 days for institutional standard replacement."
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <Globe className="w-4 h-4 text-stone-600" />,
      content: "All biological synthesis compounds are vacuum-desiccated and dispatched in temperature-stabilized cold-chain parcels to maintain peptide stability. Orders are prepared and shipped via premier logistics couriers within 24 standard business hours of validation. Secure tracking indicators are registered and delivered directly to the laboratory coordinator's secure mail gateway."
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="w-4 h-4 text-stone-600" />,
      content: "1. RESEARCH-USE ONLY (RUO) MANDATE:\nAll peptide compounds, biochemical reagents, and analytical reference standards synthesized and supplied by Immortal Labs are intended strictly for in vitro laboratory research, clinical diagnostic validation, and chemical analysis. Under no circumstances are any products formulated, intended, or authorized for direct human consumption, therapeutic use, veterinary practice, agricultural administration, or cosmetic formulation. Reagents must not be introduced into human or animal clinical workflows under any scenario.\n\n2. CHEMICAL & PHYSICAL COMPLIANCE:\nThe buyer (defined as the purchasing researcher, medical institution, or laboratory coordinator) represents and warrants that they possess the necessary licensing, specialized safety equipment, and certified professional personnel required to store, handle, and analyze hazardous, uncharacterized, or highly concentrated peptide sequences safely. All buyers represent complete compliance with state, federal, and international biosafety guidelines, maintaining rigorous disposal and laboratory containment protocols.\n\n3. MACROMOLECULAR STABILITY & STORAGE PROTOCOLS:\nPeptides are complex, temperature-sensitive macromolecules prone to active oxidation, deamidation, thermal degradation, and peptide bond cleavage. Upon laboratory receipt, the buyer must store all dry, vacuum-desiccated lyophilized vials in a dry freezer at -20°C (or -80°C for deep archival storage). Reconstitution of biological standards must occur in sterile environments under ISO Class 5 laminar flow hood cabinets using bacteriostatic water or scientific-grade sterile diluents. Immortal Labs denies any responsibility for product degradation or structural breakdown occurring due to improper chemical reconstitution or storage post-delivery.\n\n4. TOXICOLOGICAL & PHARMACOLOGICAL LIMITATIONS:\nThe full physiological, toxicological, and pharmacological profiles of these synthetic compounds have not been thoroughly mapped or investigated. Due to their status as clinical-stage or preclinical chemical assets, hazard potential must be handled with supreme caution. All research personnel must wear double-nitrile protective gloves, fluid-resistant lab coats, and safety goggles to prevent dermal adsorption or accidental inhalation. The absence of an established toxicology profile means the user must treat all substances as potentially hazardous reagents.\n\n5. SYSTEMATIC LIABILITY DISCLAIMER:\nImmortal Labs, its scientific directors, laboratory technicians, synthesizers, and distribution coordinators shall not be held liable for any damages, personal injuries, clinical side effects, or organizational liabilities resulting from the handling, misuse, unauthorized therapeutic trial, storage, or hazardous disposal of purchased reagents. The buyer agrees to fully indemnify, defend, and hold harmless Immortal Labs against any and all legal claims, administrative fines, or losses arising out of unauthorized or clinical application of the supplied laboratory compounds."
    }
  ];

  return (
    <div className="mt-10 pt-8 border-t-2 border-black max-w-4xl mx-auto text-black font-mono">
      {/* About Us Section */}
      <section className="mb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2">
          ORGANIZATION OVERVIEW // EST. 2026
        </span>
        <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight mb-3">
          ABOUT IMMORTAL LABS
        </h2>
        <p className="text-xs text-stone-700 leading-relaxed font-sans max-w-3xl">
          Immortal Labs is a state-of-the-art laboratory synthesis facility committed to the provisioning of ultra-pure chemical reagents and certified lyophilized peptide reference standards. We supply premier research universities, scientific institutions, and clinical laboratories globally. Our advanced formulations are verified via HPLC chromatography and mass spectrometry to exceed a strict 99.8% purity matrix, ensuring pristine research purposes, biological diagnostic validation, and analytical reproducibility.
        </p>
      </section>

      {/* Policy Information Section */}
      <section className="bg-stone-50 border-2 border-black p-6">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-1">
          REGULATORY POLICIES
        </span>
        <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-tight mb-4">
          POLICY INFORMATION
        </h3>

        <div className="space-y-2">
          {policies.map((policy) => {
            const isOpen = openPolicy === policy.id;
            return (
              <div 
                key={policy.id} 
                className="border border-black bg-white transition-all overflow-hidden"
              >
                <button
                  onClick={() => togglePolicy(policy.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer hover:bg-stone-50 transition-colors select-none"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    {policy.icon}
                    <span>{policy.title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-black shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-stone-100 text-[11px] leading-relaxed text-stone-600 font-sans space-y-3">
                    {policy.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
