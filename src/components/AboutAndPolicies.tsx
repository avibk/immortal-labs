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
      content: "Chemical products and reference standards synthesized by Immortal Labs are designed and supplied strictly for in vitro laboratory analysis, research purposes, and diagnostic verification. Under no circumstances are these products formulated, intended, or authorized for human clinical therapy, therapeutic prescription, direct administration, or consumer applications. All institutional buyers represent and warrant full compliance with state and federal laboratory biosafety guidelines."
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
                  <div className="px-4 pb-4 pt-1 border-t border-stone-100 text-[11px] leading-relaxed text-stone-600 font-sans">
                    {policy.content}
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
