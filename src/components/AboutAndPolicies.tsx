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
      content: `REVISED PRIVACY POLICY
PRIVACY POLICY

Last Updated: 14 July, 2026

Immortal Labs ("Company," "we," "us") respects your privacy. This policy explains our data handling practices.

1. Information We Collect
We collect only the information strictly necessary to fulfill your order:

Shipping Information: Recipient name, delivery address, contact phone number, and email address (required by the courier for customs clearance and delivery notifications).

We do not collect, store, or process any other personal data, including but not limited to: browsing history, IP addresses, device fingerprints, financial credentials, or private crypto wallet keys.

2. How We Use Your Information
Your shipping information is used solely and exclusively to:

Generate shipping labels and customs documentation.

Coordinate delivery with our designated courier service.

We do not use your data for marketing, analytics, profiling, telemetry, or any other purpose.

3. Data Retention (Zero Retention Policy)
We do not retain your personal information in our internal systems. Once your order is fulfilled and the shipping label has been generated, your shipping details are not stored in any database. Transaction records may be kept only to the minimal extent required to comply with applicable tax or customs regulations, but are never used for commercial purposes.

4. Data Sharing
We share your shipping information exclusively with the courier service (e.g., DHL, FedEx, UPS) required to deliver your package. We do not sell, rent, trade, or disclose your information to any advertisers, data brokers, or third-party marketing entities.

5. No Cookies, No Tracking
Our website does not use any cookies, tracking pixels, analytics scripts, or telemetry tools. We do not track your browsing behavior, session data, or return visits.

6. No Third-Party Links
Our website contains no external third-party links (e.g., social media buttons, advertiser banners, or affiliate redirects). Your interaction with our site remains entirely self-contained.

7. Cryptocurrency Payments
All payments are processed via decentralized cryptocurrency networks directly through your personal crypto wallet. We never collect, process, or have access to your financial information, bank details, credit card numbers, or private blockchain keys.

8. Your Rights & Contact
Since we do not store your personal data after order fulfillment, there is no data to access, rectify, or delete. If you have concerns regarding a specific shipment, you may contact us at:

Email: support@immortallabs.com

Address: Technoparkstrasse 1, 8005 Zürich, Switzerland`
    },
    {
      id: "refund",
      title: "Refund Policy",
      icon: <HelpCircle className="w-4 h-4 text-stone-600" />,
      content: `REVISED REFUND & CANCELLATION POLICY
REFUND, CANCELLATION, AND SHIPPING RISK POLICY

Last Updated: 14 July, 2026

1. NO CANCELLATION POLICY
All sales are final. Once you click "Confirm Purchase" and initiate your cryptocurrency transaction, your order enters our fulfillment pipeline immediately. We do not offer order cancellations for any reason, at any time, whether before or after dispatch.

2. NO REFUND POLICY
Due to the specialized research-grade nature of our products and the irreversible finality of blockchain transactions, we do not issue refunds, chargebacks, store credits, or replacements for any reason. Please ensure you have verified the product specifications and shipping address carefully before completing your purchase.

3. Cryptocurrency Irreversibility
Crypto transactions are non-reversible. We cannot "reverse" or "cancel" a payment once it has been confirmed on the blockchain. We do not store your wallet credentials and are unable to initiate any return transactions.

4. Shipping and Risk of Loss
Title and full risk of loss for all products pass to the Buyer immediately upon the product being handed to the carrier at our laboratory facility. We are not responsible for:

Shipping delays, misrouting, or failed delivery attempts by the courier.

Theft, loss, or damage occurring during international or domestic transit.

5. Customs, Seizure, and Importation (CRITICAL)
The Buyer is the sole importer of record for all international shipments. Any actions taken by foreign customs authorities, border control, or local regulatory agencies—including but not limited to seizure, confiscation, destruction, return-to-sender, or extended customs holds—are strictly the Buyer's responsibility.

We will not issue refunds, reship products, or provide compensation under any of the following circumstances:

The package is seized, detained, or destroyed by customs in the destination country.

The Buyer fails to pay applicable import duties, taxes, or handling fees.

The package is damaged by the destination country's local postal service or courier after clearing customs.

6. Physical Damage During Transit (Origin Only)
The only scenario in which we will consider a replacement is if you can provide irrefutable photographic evidence that the product's vacuum seal was broken or the vial was physically shattered before the package left our country of origin (e.g., damage clearly visible on the external shipping box at the time of handover to the carrier). Claims for damage occurring anywhere within the destination country's jurisdiction will be automatically denied.

7. Finality of Purchase
By completing a purchase on our website, you expressly acknowledge, agree, and consent to all terms outlined in this Refund Policy. There are no exceptions.`
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <Globe className="w-4 h-4 text-stone-600" />,
      content: `SHIPPING & DELIVERY POLICY
Last Updated: 14 July, 2026

This Shipping & Delivery Policy forms an integral part of our Terms of Service. By placing an order, you expressly agree to all terms set forth herein.

1. Order Processing & Validation
1.1 Order Confirmation Trigger. Order processing begins only after the following conditions are met:

(a) Your cryptocurrency payment has received the required number of blockchain confirmations (as determined by our system); and

(b) Your institutional eligibility and shipping address have been successfully validated against our internal compliance protocols.

1.2 Processing Timeframe. Upon successful validation, orders are prepared and dispatched within 24 standard business hours. Our business hours are Monday through Friday, excluding internationally recognized public holidays. Orders validated on weekends or holidays will commence processing on the next standard business day.

1.3 Order Verification. Due to the research-use-only nature of our products, we reserve the right to delay dispatch for up to 72 hours if we require additional institutional verification documentation to ensure regulatory compliance.

2. Packaging & Cold-Chain Preservation
2.1 Vacuum-Desiccated Preparation. All peptide compounds and biochemical reagents are meticulously vacuum-desiccated and sealed in sterile, inert-glass vials to prevent moisture ingress and oxidative degradation prior to dispatch.

2.2 Temperature-Stabilized Cold-Chain Parcels. To maintain macromolecular stability and peptide integrity during transit, all shipments are packaged in temperature-stabilized cold-chain parcels. Depending on the specific compound's stability profile, shipments are dispatched using:

Insulated thermal shippers with phase-change gel packs (maintaining -20°C to 0°C); or

Dry-ice encapsulated containers (maintaining -78°C for deep archival-grade compounds).

2.3 Barrier Protection. All vials are secured within padded, shock-absorbent interior packaging to minimize mechanical stress and physical breakage during standard courier handling procedures.

3. Carrier Selection & Dispatch
3.1 Premier Logistics Couriers. We exclusively utilize premier international courier services with dedicated cold-chain logistics divisions (e.g., DHL Express, FedEx Priority, or UPS Worldwide). The specific carrier is selected at our sole discretion based on the destination country's customs infrastructure and transit time reliability.

3.2 Dispatch Location. All products are dispatched from our certified laboratory facility. The buyer is the designated importer of record for all international shipments.

4. Tracking & Notification
4.1 Secure Tracking Registration. Upon dispatch, a unique, secure tracking indicator is registered with the carrier and forwarded directly to the laboratory coordinator's provided email address.

4.2 Real-Time Monitoring. You will receive automated courier notifications regarding shipment milestones, including:

Pickup confirmation

Transit scans

Customs clearance initiation

Estimated delivery window

Final delivery confirmation

4.3 Coordinator Responsibility. It is the sole responsibility of the purchasing laboratory coordinator to monitor the provided tracking link actively. We are not obligated to provide manual status updates during transit.

5. Delivery Timeframes (Estimates Only)
5.1 Domestic Shipments (within country of origin): Typically delivered within 2 to 5 business days from dispatch.

5.2 International Shipments: Estimated delivery times range from 5 to 14 business days, depending on the destination country, customs processing volumes, and local courier handover schedules.

5.3 No Guaranteed Delivery Dates. All delivery timeframes provided are estimates only. We do not guarantee delivery by a specific date and shall not be held liable for delays caused by the courier, customs, weather events, or any other factor beyond our direct operational control.

6. Customs, Duties, and Import Clearance (Critical)
6.1 Buyer as Importer of Record. For all international orders, the Buyer is the sole importer of record. Title and full risk of loss pass to the Buyer upon the product being handed to the carrier at our facility.

6.2 Customs Documentation. We provide all legally required shipping documentation, including:

Commercial invoices

Certificates of Analysis (CoA)

Material Safety Data Sheets (MSDS)

Country-specific customs declaration forms

6.3 Buyer Responsibilities. The Buyer is exclusively responsible for:

Ensuring that the ordered peptides are legally importable into the destination country.

Paying all applicable import duties, local taxes, customs brokerage fees, and administrative handling charges imposed by the destination country.

Responding promptly to any customs inquiries, license requests, or inspection holds.

6.4 Customs Seizure, Delay, or Destruction. We explicitly disclaim all liability for:

Customs seizures, confiscations, or destruction of the shipment by authorities in the destination country.

Extended customs holds, inspections, or clearance delays beyond our control.

Additional storage or demurrage fees charged by the courier or customs broker due to the Buyer's failure to promptly clear the shipment.

Under no circumstances will refunds, reshipments, or credits be issued for shipments seized, detained, or destroyed by customs authorities. (Refer to our Refund Policy.)

7. Incorrect or Undeliverable Addresses
7.1 Address Verification. It is the Buyer's sole responsibility to provide a complete, accurate, and deliverable shipping address at the time of purchase. We are not responsible for verifying address accuracy beyond standard courier validation tools.

7.2 Failed Delivery Attempts. If a shipment is returned to us due to:

An incorrect or incomplete address provided by the Buyer;

The Buyer's failure to arrange customs clearance or pay duties;

The Buyer's refusal to accept the package; or

The Buyer's unavailability for delivery after multiple courier attempts;

the shipment will be considered abandoned. We will not issue any refund, and the Buyer assumes full financial loss for the abandoned goods. Reshipment, if technically feasible and legally permissible, will require full repurchase of the product, including new shipping fees.

8. Inspection Upon Receipt
8.1 Immediate Inspection Required. Upon delivery, the Buyer must immediately inspect the external packaging for visible damage (e.g., crushed boxes, torn insulation, or leaking gel packs) before accepting the shipment from the courier.

8.2 Documenting Damage. If the external packaging shows evidence of severe physical trauma that could compromise the internal vials, the Buyer should:

Note the damage on the courier's delivery manifest before signing.

Take dated, high-resolution photographs of the damaged external packaging and internal contents.

8.3 Claims Window. Any claim relating to physical damage that occurred exclusively prior to handover to the carrier in our country of origin must be submitted within 14 calendar days of delivery, accompanied by the required photographic evidence. Claims submitted after this window will not be entertained.

9. Force Majeure
We shall not be held liable for any failure or delay in performance of our shipping obligations resulting from events beyond our reasonable control, including but not limited to: natural disasters (earthquakes, floods, storms), public health emergencies (pandemics, quarantines), governmental actions (export bans, embargoes), labor disputes, courier service interruptions, civil unrest, or cybersecurity disruptions affecting logistics networks.

10. Entire Agreement
This Shipping & Delivery Policy, together with our Terms of Service, Refund Policy, and Privacy Policy, constitutes the entire agreement between the Buyer and Immortal Labs regarding the shipment and delivery of purchased products.`
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="w-4 h-4 text-stone-600" />,
      content: `TERMS OF SERVICE
Last Updated: 14 July, 2026

PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING THIS WEBSITE OR PURCHASING ANY PRODUCTS.

1. Acceptance of Terms
By accessing this website, placing an order, or purchasing any products from Immortal Labs ("Company," "we," "us," or "our"), you ("Customer," "Buyer," or "you") agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use this website or purchase our products.

2. Customer Eligibility
2.1 Qualified Purchasers Only. Immortal Labs exclusively supplies products to verified businesses, research institutions, universities, hospitals, government agencies, and other qualified professional entities. We do not sell to individual consumers or unverified purchasers.

2.2 Verification Required. All orders must be placed using an institutional or corporate email address. We reserve the right to verify a purchaser's professional qualifications, institutional affiliation, and laboratory safety capabilities before accepting any order.

2.3 Right to Refuse. We reserve the right to refuse, cancel, or decline any order at our sole discretion, including but not limited to orders that we determine may be used for non-research purposes or that fail to meet our eligibility requirements.

2.4 Age Requirement. By placing an order, you represent that you are at least 18 years of age and are legally authorized to enter into binding commercial agreements on behalf of the purchasing entity.

3. Research-Use Only (RUO) Mandate
3.1 Strictly for Research. All peptide compounds, biochemical reagents, and analytical reference standards synthesized and supplied by Immortal Labs are intended strictly for in vitro laboratory research, clinical diagnostic validation, and chemical analysis.

3.2 Prohibited Uses. Under no circumstances are any products formulated, intended, or authorized for:

Direct human consumption, ingestion, injection, or topical application

Therapeutic, medical, or clinical treatment of any kind

Veterinary practice or animal administration

Agricultural, horticultural, or cosmetic formulation

Food, drug, or medical device applications

3.3 Acknowledgment. By placing an order, you expressly acknowledge and agree that all products are purchased solely for internal scientific research purposes and will not be used in any clinical, diagnostic, or patient-care setting.

4. Buyer Representations and Warranties
4.1 Licensing and Equipment. The Buyer represents and warrants that they possess all necessary licenses, specialized safety equipment, and certified professional personnel required to safely store, handle, and analyze the purchased peptide sequences.

4.2 Regulatory Compliance. The Buyer represents full compliance with all applicable state, federal, and international biosafety guidelines, including rigorous disposal and laboratory containment protocols.

4.3 Handling Competence. The Buyer represents that all products will be handled only by trained personnel who are aware of the chemical hazards associated with research-grade peptides.

5. Chemical & Physical Compliance
5.1 Safety Protocols. All research personnel handling our products must wear double-nitrile protective gloves, fluid-resistant lab coats, and safety goggles to prevent dermal adsorption or accidental inhalation.

5.2 Hazard Awareness. Due to the status of these synthetic compounds as clinical-stage or preclinical chemical assets, their full physiological, toxicological, and pharmacological profiles have not been thoroughly mapped. All substances must be treated as potentially hazardous reagents.

6. Macromolecular Stability & Storage Protocols
6.1 Proper Storage Required. Peptides are complex, temperature-sensitive macromolecules prone to oxidation, deamidation, thermal degradation, and peptide bond cleavage. Upon receipt, the Buyer must store all dry, vacuum-desiccated lyophilized vials in a dry freezer at -20°C (or -80°C for deep archival storage).

6.2 Reconstitution Standards. Reconstitution of biological standards must occur in sterile environments under ISO Class 5 laminar flow hood cabinets using bacteriostatic water or scientific-grade sterile diluents.

6.3 No Liability for Improper Storage. Immortal Labs denies any responsibility for product degradation or structural breakdown occurring due to improper chemical reconstitution, storage, or handling post-delivery.

7. Orders, Pricing, and Payment
7.1 Order Acceptance. A binding contract is formed only upon: (i) receipt of a valid purchase order from the Buyer, and (ii) written order confirmation issued by Immortal Labs.

7.2 Pricing. All prices are subject to change without prior notice. Written quotations are valid for the period specified on the quotation document.

7.3 Payment Terms. Payment terms will be clearly outlined on the invoice or sales agreement. Late payments may accrue interest at the rate specified on the invoice.

7.4 Taxes and Fees. The Buyer is responsible for all applicable taxes, duties, customs fees, and any government-imposed charges.

8. Shipping, Delivery, and Risk of Transfer
8.1 Shipping. Products will be shipped in compliance with all applicable regulations for hazardous materials. The Buyer is responsible for all shipping, handling, and customs fees.

8.2 Risk of Loss. Risk of loss and title for products passes to the Buyer upon delivery to the carrier or upon delivery to the Buyer's specified address.

8.3 Inspection. The Buyer must inspect all products upon delivery and notify us of any damage or discrepancy within five (5) business days of receipt.

8.4 Force Majeure. Immortal Labs shall not be liable for any delays or failures in delivery caused by factors beyond our reasonable control, including but not limited to natural disasters, labor strikes, regulatory actions, or supply chain disruptions.

9. Returns, Refunds, and Warranty
9.1 Limited Warranty. Products are warranted to conform to their description in product listings and accompanying analytical data. No warranty applies if the Buyer misuses the product, fails to follow standard laboratory practices, or uses the product contrary to provided instructions.

9.2 Sole Remedy. The sole and exclusive remedy for any product proven to our satisfaction to be defective or non-conforming shall be, at our sole discretion, replacement without charge or refund of the purchase price.

9.3 Returns. Returns must be authorized in advance and made within thirty (30) days of delivery, in unused and resalable condition. Due to safety regulations, certain hazardous materials may not be eligible for return.

9.4 No Warranty for Misuse. Once a product has been used, no refund or replacement is available.

10. Disclaimer of Liability
10.1 No Liability for Misuse. Immortal Labs, its scientific directors, laboratory technicians, synthesizers, and distribution coordinators shall not be held liable for any damages, personal injuries, clinical side effects, or organizational liabilities resulting from the handling, misuse, unauthorized therapeutic trial, improper storage, or hazardous disposal of purchased reagents.

10.2 No Liability for Consequential Damages. In no event shall Immortal Labs be liable for any direct, indirect, incidental, consequential, punitive, or special damages arising from or related to the use of its products, including but not limited to lost profits, lost revenue, downtime, or third-party claims.

10.3 No Warranty of Fitness. Immortal Labs makes no warranty, express or implied, regarding the fitness of any product for any particular research purpose, application, or outcome.

10.4 Liability Cap. To the maximum extent permitted by law, Immortal Labs' total liability for any claim arising out of or relating to these Terms or any product shall not exceed the total amount paid by the Buyer for the specific product giving rise to the claim.

11. Indemnification
The Buyer agrees to fully indemnify, defend, and hold harmless Immortal Labs and its affiliates, officers, employees, and agents from and against any and all claims, losses, costs, damages, fees, expenses, administrative fines, regulatory penalties, or liabilities arising out of or in connection with:

Any unauthorized or clinical application of the supplied laboratory compounds

Any misuse, improper handling, or negligent use of products

Any breach of these Terms by the Buyer

12. Intellectual Property
12.1 Ownership. All content, logos, trademarks, product names, website design, and materials on the Immortal Labs website are the exclusive property of Immortal Labs and are protected under copyright, trademark, and other intellectual property laws.

12.2 License. The Buyer is granted a limited, non-exclusive, non-transferable license to access and use the website for the sole purpose of purchasing products for research use. No other use is permitted.

12.3 Patent Disclaimer. The Buyer assumes all responsibility for patent considerations related to the use of purchased chemicals. Our product suggestions do not constitute a license to operate or to infringe any patents.

13. Governing Law and Dispute Resolution
13.1 Governing Law. These Terms shall be governed by and construed in accordance with the laws of the state in which Immortal Labs is incorporated, without regard to its conflict of laws principles.

13.2 Dispute Resolution. Any dispute arising out of or relating to these Terms or the purchase of any product shall be resolved exclusively in the state or federal courts located in the jurisdiction where Immortal Labs is headquartered. The Buyer consents to the personal jurisdiction of such courts.

13.3 Waiver of Class Action. To the fullest extent permitted by law, the Buyer agrees to bring any claim against Immortal Labs only in their individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.

14. Severability
If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.

15. Amendments
Immortal Labs reserves the right to update or modify these Terms at any time. Changes will be effective immediately upon posting to the website. Continued use of the website or placement of orders after such changes constitutes acceptance of the modified Terms.

16. Entire Agreement
These Terms constitute the entire agreement between the Buyer and Immortal Labs regarding the subject matter hereof and supersede all prior or contemporaneous communications, whether oral or written.`
    }
  ];

  return (
    <div className="mt-10 pt-8 border-t-2 border-black max-w-4xl mx-auto text-black font-mono">
      {/* About Us Section */}
      <section className="mb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2">
          IMMORTAL LABS // EST. 2026
        </span>
        <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight mb-3">
          ABOUT IMMORTAL LABS
        </h2>
        <p className="text-xs text-stone-700 leading-relaxed font-sans max-w-3xl">
          Immortal Labs is dedicated to the development and synthesis of ultra-pure biochemical reagents, complex organic compounds, and premium lyophilized peptide reference standards of uncompromising caliber. Driven by an exacting standard of molecular integrity, our focus is centered on perfecting synthesis pathways to deliver compounds of unparalleled consistency and structural fidelity. Each batch of chemical agents and molecular formulas undergoes comprehensive analytical verification, utilizing state-of-the-art High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) validation to guarantee an exceptional 99.8% purity index. By maintaining rigorous quality assurance protocols and minimizing environmental interference during synthesis, we ensure that every formulation stands as a reliable standard for analytical reproducibility, precise molecular verification, and pristine chemical research. Our goal is to sell high quality research chemicals for research purposes only.
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
                    {policy.content.split(/\r?\n\r?\n/).map((paragraph, index) => (
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
