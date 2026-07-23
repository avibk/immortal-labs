import { useState, useEffect } from "react";
import { products, Product } from "./data/products";
import { CartItem, CheckoutFormData, VerificationLog } from "./types";
import ProductCard from "./components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
// @ts-ignore
import vialHgh from "./assets/images/vial_hgh_1783932766464.jpg";
// @ts-ignore
import vialSemaglutide from "./assets/images/vial_semaglutide_1783932732907.jpg";
// @ts-ignore
import vialTirzepatide from "./assets/images/vial_tirzepatide_1783932743467.jpg";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ProductQuickView from "./components/ProductQuickView";
import { AboutAndPolicies } from "./components/AboutAndPolicies";
import COASView from "./components/COASView";
import {
  FlaskConical,
  ShieldCheck,
  Search,
  ShoppingBag,
  User,
  SlidersHorizontal,
  ChevronDown,
  Award,
  Lock,
  Globe,
  Info,
  CheckCircle2,
  RefreshCw,
  Eye,
  Check,
  Clock,
  Menu,
  Thermometer,
  X,
  Send
} from "lucide-react";

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

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<"home" | "search" | "cart" | "contact" | "coas">("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [vialHgh, vialSemaglutide, vialTirzepatide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeProductKit, setActiveProductKit] = useState<"1kit" | "10kit">("1kit");
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);

  useEffect(() => {
    if (activeProduct) {
      setActiveProductKit("1kit");
    }
  }, [activeProduct]);
  const [bannerClosed, setBannerClosed] = useState(() => localStorage.getItem("ppl_banner_closed") === "true");
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  // Custom Visual Themes Preset - permanently set to Swiss Editorial Monochrome
  const designPreset = "swiss";
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Core Data States
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("ppl_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Confetti / Checkout Success Toast States
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    id: string;
    investigator: string;
    total: number;
  } | null>(null);

  // Synchronize cart with localStorage
  useEffect(() => {
    localStorage.setItem("ppl_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Categories extracted from products list
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Core Cart Modifiers
  const handleAddToCart = (product: Product, kitType: "1kit" | "10kit" = "1kit") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && (item.kitType || "1kit") === kitType);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && (item.kitType || "1kit") === kitType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, kitType }];
    });

    // Create a minor confirmation flash
    triggerNotification(`Formula "${product.name}" (${kitType === "10kit" ? "10 KIT Bulk" : "1 KIT"}) loaded into chemical grid.`);
  };

  const handleUpdateQuantity = (id: string, kitType: "1kit" | "10kit", delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id && (item.kitType || "1kit") === kitType) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string, kitType: "1kit" | "10kit") => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === id && (item.kitType || "1kit") === kitType)));
  };

  const handleCheckoutSuccess = () => {
    const orderId = `IML-RE-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = cartItems.reduce((acc, item) => {
      const unitPrice = item.kitType === "10kit" ? item.product.price10 * 10 : item.product.price;
      return acc + unitPrice * item.quantity;
    }, 0);
    const total = subtotal;

    setLastOrderDetails({
      id: orderId,
      investigator: "Clinical Investigator",
      total: total,
    });

    setCheckoutOpen(false);
    setCartOpen(false);
    setCartItems([]); // Clear cart state
    setShowConfetti(true); // Fire confetti overlay
  };

  // Notification management (Self-expiring clinical alerts)
  const [notification, setNotification] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2500);
  };

  useEffect(() => {
    if (activeProduct) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeProduct]);

  // Group all products by their Base Product Name
  const groupedProductsMap: Record<string, Product[]> = {};
  products.forEach((p) => {
    const baseName = getBaseProductName(p.name);
    if (!groupedProductsMap[baseName]) {
      groupedProductsMap[baseName] = [];
    }
    groupedProductsMap[baseName].push(p);
  });

  // Unique list of base products
  const uniqueBaseProducts: Product[] = [];
  const seenBases = new Set<string>();
  products.forEach((p) => {
    const baseName = getBaseProductName(p.name);
    if (!seenBases.has(baseName)) {
      seenBases.add(baseName);
      uniqueBaseProducts.push(p);
    }
  });

  const filteredBaseProducts = uniqueBaseProducts.filter((product) => {
    const baseName = getBaseProductName(product.name);
    const groupItems = groupedProductsMap[baseName] || [product];

    const matchesSearch = groupItems.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesCategory = selectedCategory === "All" || groupItems.some(item => item.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Live analytics logs showing laboratory credibility
  const recentLogs: VerificationLog[] = [
    { id: "LOG-01", batchNumber: "BPC-157-1882", date: "July 09, 2026", purity: "99.82%", analyst: "Dr. K. Aris", status: "Certified" },
    { id: "LOG-02", batchNumber: "SEM-GLP-440", date: "July 08, 2026", purity: "99.91%", analyst: "Dr. L. Vance", status: "Passed" },
    { id: "LOG-03", batchNumber: "TB-500-A22", date: "July 05, 2026", purity: "99.74%", analyst: "Dr. K. Aris", status: "Certified" },
  ];

  const containerClass = {
    sterile: "min-h-screen clinical-grid text-slate-800 flex flex-col font-sans select-none pb-20 md:pb-0 transition-colors duration-500",
    midnight: "min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-20 md:pb-0 transition-colors duration-500",
    cyber: "min-h-screen bg-zinc-950 text-yellow-500 flex flex-col font-mono select-none pb-20 md:pb-0 transition-colors duration-500",
    swiss: "min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans select-none pb-20 md:pb-0 transition-colors duration-500"
  }[designPreset];

  return (
    <div className={containerClass}>
      
      {/* 1. ANNOUNCEMENT BANNER */}
      {!bannerClosed && (
        <div className="bg-black text-white text-[10px] md:text-xs py-3 px-10 text-center font-mono tracking-wider font-bold border-b-2 border-black uppercase flex items-center justify-center gap-2 relative">
          <span>
            Contact us by clicking on the{" "}
            <button 
              onClick={() => {
                setActiveTab("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="underline hover:text-stone-300 cursor-pointer font-extrabold focus:outline-none"
            >
              "Contact Us"
            </button>{" "}
            page for customer service.
          </span>
          <button
            onClick={() => {
              setBannerClosed(true);
              localStorage.setItem("ppl_banner_closed", "true");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 cursor-pointer p-1.5 flex items-center justify-center mobile-touch-target"
            title="Close Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. DYNAMIC TOP NAVBAR FOR BRANDING */}
      <header className="bg-white border-b-2 border-black text-black z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => {
              setActiveTab("home");
              setActiveProduct(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="h-9 w-9 bg-black rounded-none flex items-center justify-center border-2 border-black">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-display font-black tracking-wider text-sm uppercase text-black leading-none">Immortal Labs</span>
              <span className="block font-mono text-[8px] text-stone-600 tracking-widest font-bold mt-1">PEPTIDES / RESEARCH PURPOSES CHEMICALS</span>
            </div>
          </div>

        </div>
      </header>

      {/* 3. UNIVERSAL ACTION STRIP (CONTROL INTERFACE RIGHT BELOW NAVBAR) */}
      <div className="bg-white border-b-2 border-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Menu Button & Search Button Group - Left Side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Menu Button - Square */}
            <button
              onClick={() => setSlideMenuOpen(true)}
              className="p-2.5 border-2 border-black bg-white hover:bg-stone-100 text-black rounded-none cursor-pointer flex items-center justify-center transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] mobile-touch-target shrink-0"
              title="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Magnifier Glass Search Button - Right next to Menu Button, No borders */}
            {!showSearchInput && (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2.5 hover:bg-stone-100 text-black cursor-pointer flex items-center justify-center transition-all mobile-touch-target shrink-0 border-0 bg-transparent"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Input - Center (Only active/visible when search is open) */}
          <div className="flex-1 max-w-md flex justify-center relative">
            {showSearchInput && (
              <div className="flex items-center w-full border-2 border-black bg-stone-50 pl-3 pr-2 py-1.5 animate-fade-in rounded-none">
                <Search className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveTab("home");
                    setActiveProduct(null);
                  }}
                  placeholder="Search compounds"
                  className="w-full text-xs font-mono outline-none bg-transparent text-black"
                  autoFocus
                />
                <button 
                  onClick={() => { 
                    setSearchQuery(""); 
                    setShowSearchInput(false); 
                  }} 
                  className="text-stone-400 hover:text-black p-1 cursor-pointer"
                  title="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Cart Button - Right Side (Square/Rectangle) */}
          <button
            onClick={() => setCartOpen(true)}
            className="p-2.5 border-2 border-black bg-white hover:bg-stone-100 text-black rounded-none cursor-pointer relative flex items-center justify-center transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] mobile-touch-target shrink-0"
            title="Open Cart"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 bg-black text-white border-2 border-black font-mono text-[9px] font-bold h-5 min-w-5 px-1 flex items-center justify-center rounded-none animate-scale-up">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-10">

        {activeTab === "coas" ? (
          <COASView />
        ) : activeTab === "contact" ? (
          /* SWISS EDITORIAL CUSTOMER SERVICE TERMINAL (CONTACT US) */
          <div className="max-w-2xl mx-auto bg-white border-2 border-black p-6 md:p-10 text-black animate-fade-in rounded-none">
            <div className="border-b-2 border-black pb-4 mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 font-bold block mb-1">
                COMMUNICATIONS GATEWAY // EST. 2026
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-black">
                CUSTOMER SERVICE & SUPPORT
              </h2>
            </div>
            
            <p className="text-xs font-mono text-stone-600 mb-8 leading-relaxed uppercase">
              Please fill out the contact form below with your inquiry details. Our support team typically responds within 24 standard business hours.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const nameInput = target.elements.namedItem("fullName") as HTMLInputElement;
                const emailInput = target.elements.namedItem("email") as HTMLInputElement;
                triggerNotification(`DISPATCHED: Ticket registered under ${nameInput.value} (${emailInput.value}).`);
                target.reset();
              }}
              className="space-y-6 font-mono text-xs"
            >
              <div className="space-y-1">
                <label className="block font-bold uppercase tracking-wider text-[10px]">Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  placeholder="e.g. Alex Johnson" 
                  className="w-full bg-stone-50 border-2 border-black p-3 outline-none focus:bg-white transition-colors rounded-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold uppercase tracking-wider text-[10px]">Contact e-mail</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="e.g. alex@example.com" 
                  className="w-full bg-stone-50 border-2 border-black p-3 outline-none focus:bg-white transition-colors rounded-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold uppercase tracking-wider text-[10px]">Inquiry Subject / Catalog Reference Code</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="e.g. Reconstitution standards or wholesale order" 
                  className="w-full bg-stone-50 border-2 border-black p-3 outline-none focus:bg-white transition-colors rounded-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold uppercase tracking-wider text-[10px]">Inquiry description</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  placeholder="Please describe how we can assist you with your inquiry..." 
                  className="w-full bg-stone-50 border-2 border-black p-3 outline-none focus:bg-white transition-colors rounded-none resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white hover:bg-stone-800 text-xs font-bold uppercase tracking-widest py-3.5 cursor-pointer transition-all border-2 border-black active:bg-stone-900"
              >
                Dispatch Inquiry Ticket
              </button>
            </form>

            <div className="mt-10 pt-8 border-t-2 border-black font-mono text-[11px] text-stone-700 space-y-3">
              <span className="block font-black text-black uppercase tracking-wider text-xs mb-3">GET IN TOUCH</span>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold uppercase text-stone-500">SUPPORT DESK EMAIL</span>
                <span className="text-black font-semibold select-all">support@immortallabs.ch</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold uppercase text-stone-500">ADDRESS</span>
                <span className="text-black sm:text-right max-w-[280px]">Technoparkstrasse 1, 8005 Zürich, Switzerland</span>
              </div>
            </div>
          </div>
        ) : activeProduct ? (
          /* DETAILED PRODUCT PAGE */
          <div className="animate-fade-in max-w-4xl mx-auto text-black">
            {/* Back Button */}
            <button
              onClick={() => {
                setActiveProduct(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black hover:text-stone-600 transition-colors cursor-pointer select-none"
            >
              ← Back to Catalog
            </button>

            {/* PRODUCT SHOWCASE BORDERED CONTAINER */}
            <div className="bg-white border-2 border-black p-4 md:p-6 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Left Column: Image Area */}
                <div className="md:w-1/2 flex flex-col items-center">
                  <div className="relative w-full aspect-square md:aspect-[4/3] max-h-72 border-2 border-black bg-stone-100 flex items-center justify-center p-4 mb-0">
                    {/* Purity badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-black text-white border border-black rounded-none">
                        HPLC {activeProduct.purity}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[8px] tracking-wider px-1.5 py-0.5 bg-white text-black border border-black rounded-none font-bold">
                        99.8%+ COA STANDARD
                      </span>
                    </div>
                    
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Removed Category and CAS Index */}
                </div>

                {/* Right Column: Spec Sheets */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h1 className={`font-display font-black uppercase tracking-tight text-black leading-tight text-center ${
                        getBaseProductName(activeProduct.name).length > 25
                          ? "text-lg md:text-xl"
                          : "text-xl md:text-2xl"
                      }`}>
                        {getBaseProductName(activeProduct.name)}
                      </h1>

                      {/* Potency variant selector inside the add to cart showcase */}
                      {(groupedProductsMap[getBaseProductName(activeProduct.name)] || []).length > 1 && (
                        <div className="mt-4 mb-2 space-y-1.5">
                          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold block text-center">
                            Select Compound Potency
                          </span>
                          <div className="flex flex-wrap justify-center gap-1.5 p-1 border border-black bg-stone-50 max-w-xs mx-auto">
                            {(groupedProductsMap[getBaseProductName(activeProduct.name)] || []).map((v) => {
                              const isSelected = v.id === activeProduct.id;
                              const potencyLabel = v.dose.split(" ")[0];
                              return (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() => setActiveProduct(v)}
                                  className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                                    isSelected
                                      ? "bg-black text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                      : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-black"
                                  }`}
                                >
                                  {potencyLabel}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                        <span className="font-mono text-xs font-bold text-black bg-stone-100 border border-black px-3 py-1 uppercase shadow-xs">
                          Price: ${activeProduct.price.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs text-stone-500 bg-stone-50 border border-stone-200 py-1 px-3 inline-block shadow-xs">
                          LOT SIZE: {activeProduct.dose}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA - RIGHT UNDER the showcase inside/under the border */}
              <button
                onClick={() => {
                  handleAddToCart(activeProduct, activeProductKit);
                  setCartOpen(true);
                }}
                className="w-full bg-black hover:bg-stone-800 text-white font-mono text-xs font-bold uppercase tracking-widest py-4 cursor-pointer transition-all border-2 border-black active:bg-stone-900 flex items-center justify-center gap-2"
              >
                <FlaskConical className="w-4 h-4 text-white" />
                <span>add to cart</span>
              </button>
            </div>

            {/* ALL DESCRIPTION AND STORAGE GUIDANCE OUTSIDE THE BORDER */}
            <div className="space-y-6 mt-8 px-2">
              {/* Description */}
              <div className="space-y-2">
                <span className="text-[10px] block font-mono text-stone-500 uppercase tracking-widest font-bold">PHARMACOLOGICAL SUMMARY</span>
                <p className="text-stone-800 leading-relaxed font-sans text-xs md:text-sm">
                  {activeProduct.description}
                </p>
              </div>

              {/* Storage Guidance */}
              <div className="bg-stone-50 border border-black p-3.5 flex gap-2.5 items-start text-[11px] leading-relaxed">
                <span className="text-black font-mono font-bold shrink-0 mt-0.5">STORAGE //</span>
                <div className="text-stone-700">
                  <strong>Cold-Chain Storage Guidance:</strong> {activeProduct.storage}
                </div>
              </div>
            </div>

            {/* About us & Policy Information Section */}
            <AboutAndPolicies />
          </div>
        ) : (
          /* REGULAR E-COMMERCE PRODUCTS CATALOG */
          <>
            {/* HERO INTRO BLOCK: High trust laboratory introduction */}
            <div className={`p-4 md:p-5 pb-3 md:pb-4 relative overflow-hidden mb-3 transition-all duration-300 ${
              {
                sterile: "bg-radial from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl",
                midnight: "bg-radial from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl",
                cyber: "bg-zinc-900 border-2 border-yellow-500 text-yellow-400 rounded-none",
                swiss: "bg-white border-2 border-black text-black rounded-none"
              }[designPreset]
            }`}>
              {/* Slideshow Background */}
              <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${
                designPreset === "swiss" ? "bg-white" : "bg-slate-950"
              }`}>
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    alt="Immortal Labs backdrop slideshow"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ 
                      x: "0%",
                      opacity: designPreset === "swiss" ? 0.38 : 0.26, 
                    }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      designPreset === "swiss" 
                        ? "" 
                        : "invert hue-rotate-180 brightness-110 contrast-125 mix-blend-screen"
                    }`}
                  />
                </AnimatePresence>
              </div>

              {designPreset !== "swiss" && (
                <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              )}
              
              <motion.div 
                className="max-w-2xl relative z-10"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                    }
                  }
                }}
              >
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5 shadow-sm ${
                    {
                      sterile: "bg-cyan-950 border border-cyan-800/40 text-cyan-300",
                      midnight: "bg-cyan-950 border border-cyan-800/40 text-cyan-300",
                      cyber: "bg-yellow-950 border border-yellow-500/20 text-yellow-400",
                      swiss: "bg-black text-white rounded-none"
                    }[designPreset]
                  }`}
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${designPreset === 'swiss' ? 'text-white' : 'text-emerald-400 animate-pulse'}`} />
                  99.8%+ Ultra-Pure Synthesizers
                </motion.span>
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className={`font-display font-bold tracking-tight leading-none ${
                    designPreset === 'swiss' ? 'text-black text-2xl md:text-3xl font-black' : 'text-white text-xl md:text-3xl'
                  }`}
                >
                  Clinical-Grade Peptides. Zero Compromise.
                </motion.h1>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className={`mt-1 leading-snug text-clamp-body ${
                    designPreset === 'swiss' ? 'text-stone-800 font-sans' : 'text-slate-300 font-sans'
                  }`}
                >
                  cGMP-engineered, HPLC-verified reference standards, shipped with cold-chain integrity for diagnostics and research.
                </motion.p>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="mt-2.5 flex flex-wrap gap-1.5 md:gap-2 items-center text-[9.5px] md:text-[10px] font-mono font-bold uppercase"
                >
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black bg-black text-white rounded-none shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    cGMP Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black bg-black text-white rounded-none shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                    <Award className="w-3 h-3 text-white" />
                    HPLC Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black bg-black text-white rounded-none shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                    <Thermometer className="w-3 h-3 text-white" />
                    Cold-Chain Secured
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* CLASSIFIED CATEGORY SELECTORS REMOVED */}


        {/* RESULTS METRICS (Targeted label removed) */}
        {searchQuery && (
          <div className="flex justify-end items-center mb-4 text-xs font-mono text-slate-400">
            <button 
              onClick={() => setSearchQuery("")}
              className="text-cyan-700 hover:underline font-semibold cursor-pointer"
            >
              CLEAR SEARCH FILTER
            </button>
          </div>
        )}

        {/* 4. MAIN RESPONSIVE PRODUCT GRID (Behaves differently based on screens) */}
        {/* On Mobile (< 768px): 1 Column, swipable card reveal */}
        {/* On Desktop (> 1024px): 4 Column layout */}
        {filteredBaseProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-lg mx-auto shadow-xs">
            <span className="text-4xl">🔬</span>
            <h3 className="mt-4 font-display font-semibold text-slate-800 text-sm">NO PRODUCTS FOUND</h3>
            <p className="mt-2 text-xs text-slate-400 leading-normal font-mono">
              No products found. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-5 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-semibold hover:bg-cyan-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredBaseProducts.map((product) => {
              const baseName = getBaseProductName(product.name);
              const variants = groupedProductsMap[baseName] || [];
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  variants={variants}
                  onClick={(p) => setActiveProduct(p)}
                  designPreset={designPreset}
                />
              );
            })}
          </div>
        )}
          </>
        )}

        {/* About us & Policy Information Section */}
        {!activeProduct && (
          <div className="mt-6">
            <AboutAndPolicies />
          </div>
        )}
      </main>

      {/* 7. SECURE PAYMENT BADGES IN SITE FOOTER */}
      <footer className="bg-white border-t-2 border-black py-8 text-center text-xs font-mono text-stone-500 space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-black" />
            <span className="font-display font-black text-black uppercase tracking-wider">IMMORTAL LABS</span>
          </div>
          
          {/* Secure Payment logos and badges */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <span className="flex items-center gap-1.5 text-black font-bold uppercase text-[10px]"><Lock className="w-3.5 h-3.5 text-black" /> PCI DSS compliant</span>
            <span className="flex items-center gap-1.5 text-black font-bold uppercase text-[10px]"><ShieldCheck className="w-3.5 h-3.5 text-black" /> 256-bit AES Crypt</span>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-black px-2 py-1 rounded-none">
              <span className="text-[9px] font-black text-black">ACCEPTED PAYMENTS:</span>
              <span className="text-[9px] text-black font-normal font-mono uppercase tracking-widest">Crypto (BTC)</span>
            </div>
          </div>

          <p className="text-[10px] text-stone-400">
            © 2026 Immortal Labs. Strictly for Research Purposes & Chemical Diagnostic Validation.
          </p>
        </div>
      </footer>

      {/* 8. SLIDE-OUT LEFT NAVIGATION DRAWER */}
      {slideMenuOpen && (
        <div 
          id="slide-menu-backdrop"
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSlideMenuOpen(false)}
        />
      )}
      
      <div
        id="slide-menu-drawer"
        className={`fixed top-0 bottom-0 left-0 w-36 md:w-56 bg-white border-r border-stone-200 z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col text-black font-mono ${
          slideMenuOpen ? "transform-none" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-black flex items-center justify-center">
              <FlaskConical className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="block font-display font-black tracking-wider text-[11px] uppercase">Immortal Labs</span>
            </div>
          </div>
          <button
            onClick={() => setSlideMenuOpen(false)}
            className="p-1 hover:bg-stone-200 cursor-pointer transition-all rounded-full"
            title="Close Menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
 
        {/* Drawer Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-2">
          <span className="block text-[8px] font-bold text-stone-400 tracking-widest uppercase mb-2 px-2">SYSTEM LOCATIONS</span>
          
          {/* Catalog / Home */}
          <button
            onClick={() => {
              setActiveTab("home");
              setActiveProduct(null);
              setSlideMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`w-full flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "home" && !activeProduct 
                ? "bg-black text-white" 
                : "text-stone-800 hover:bg-stone-100"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Catalog</span>
          </button>
 
          {/* Contact Us */}
          <button
            onClick={() => {
              setActiveTab("contact");
              setActiveProduct(null);
              setSlideMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`w-full flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "contact" 
                ? "bg-black text-white" 
                : "text-stone-800 hover:bg-stone-100"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Contact Us</span>
          </button>

          {/* COAS */}
          <button
            onClick={() => {
              setActiveTab("coas");
              setActiveProduct(null);
              setSlideMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`w-full flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "coas" 
                ? "bg-black text-white" 
                : "text-stone-800 hover:bg-stone-100"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>COAS</span>
          </button>
 
          {/* Cart Trigger */}
          <button
            onClick={() => {
              setSlideMenuOpen(false);
              setCartOpen(true);
            }}
            className="w-full flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-2 text-xs font-semibold tracking-wider transition-all text-stone-800 hover:bg-stone-100 cursor-pointer relative whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute right-3 bg-black text-white font-mono text-[9px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
 
        {/* Drawer Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 text-[8px] text-stone-500 space-y-0.5">
          <div>© 2026 Immortal Labs</div>
          <div className="uppercase tracking-wide">HPLC Standard Certified</div>
        </div>
      </div>

      {/* 9. THE DUAL-BEHAVING CART SLIDING OVERLAY CONTAINER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setCheckoutOpen(true);
          setCartOpen(false);
        }}
      />

      {/* 10. PRODUCT DETAILED QUICK-VIEW MODAL (On double click or button) */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 11. HTML5-VALIDATED SECURE CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* 12. FLOATING CONFETTI LABORATORY TOAST ON CHECKOUT SUCCESS */}
      {showConfetti && lastOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none font-sans">
          
          {/* Confetti Particles simulation inside modal overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => {
              const left = `${Math.random() * 100}%`;
              const top = `${Math.random() * 100}%`;
              const delay = `${Math.random() * 3}s`;
              const duration = `${Math.random() * 4 + 3}s`;
              const colors = ["bg-cyan-400", "bg-emerald-400", "bg-indigo-400", "bg-teal-400"];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={i}
                  className={`absolute h-2.5 w-2.5 rounded-full ${randomColor} opacity-75 animate-bounce`}
                  style={{
                    left: left,
                    top: top,
                    animationDelay: delay,
                    animationDuration: duration,
                  }}
                />
              );
            })}
          </div>

          <div className="relative bg-white max-w-md w-full rounded-2xl p-8 border border-slate-200 text-center shadow-2xl z-10 animate-scale-up">
            <div className="mx-auto h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-pulse" />
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900 uppercase tracking-tight">Order Reserved</h3>
            <p className="text-xs font-mono text-cyan-800 bg-cyan-50 px-3 py-1.5 rounded-md inline-block mt-2 font-bold tracking-wider">
              ORDER REF: {lastOrderDetails.id}
            </p>

            <div className="my-6 border-y border-slate-150 py-4 font-mono text-xs text-slate-600 text-left space-y-2">
              <div className="flex justify-between">
                <span>ORDER STATUS:</span>
                <span className="text-amber-600 font-bold">AWAITING TELEGRAM CHAT</span>
              </div>
              <div className="flex justify-between">
                <span>CLEARANCE INDEX:</span>
                <span className="text-slate-900">SECURE DISPATCH READY</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-900 text-sm">
                <span>TOTAL AMOUNT:</span>
                <span className="text-cyan-700">${lastOrderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Your compounds are successfully reserved in our inventory. Please contact our active Telegram representative with your Order Reference Code to finalize dispatch.
            </p>

            <button
              onClick={() => {
                setShowConfetti(false);
                setLastOrderDetails(null);
              }}
              className="w-full py-3 bg-slate-900 hover:bg-cyan-700 text-white font-display text-xs font-bold uppercase tracking-widest rounded-lg cursor-pointer transition-all shadow-md"
            >
              Conclude Order
            </button>
          </div>
        </div>
      )}

      {/* 13. MINI SELF-EXPIRING CLINICAL ALERTS */}
      {notification && (
        <div className="fixed bottom-20 md:bottom-6 left-6 z-50 bg-slate-900 text-white font-mono text-[11px] font-bold py-3 px-4 rounded-xl shadow-2xl border border-cyan-500/20 flex items-center gap-2.5 max-w-sm animate-slide-in-left select-none">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
