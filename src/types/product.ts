import { CategoryId } from "./category";

export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  key: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  key: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
}

export interface StaffCreate {
  name: string;
  position: string;
  department: string;
}

export interface Order {
  id: string;
  product_id: string;
  quantity: string;
  order_date: string;
}

export interface OrderCreate {
  product_id: string;
  quantity: string;
  order_date: string;
}
