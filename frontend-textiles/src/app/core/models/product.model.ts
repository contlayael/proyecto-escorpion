// src/app/core/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price_retail: number;
  price_wholesale: number;
  stock: number;
  weight: number;
  width: number;
  height: number;
  length: number;
}