import { Product } from "./data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  kitType?: "1kit" | "10kit";
}

export interface VerificationLog {
  id: string;
  batchNumber: string;
  date: string;
  purity: string;
  analyst: string;
  status: "Passed" | "Certified";
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  institute: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "crypto" | "credit_card" | "bank_wire";
  licenseApproved: boolean;
}
