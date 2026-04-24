// src/app/core/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price_retail: number;     // Precio menudeo
  price_wholesale: number; // Precio mayoreo
  stock: number;
  weight: number;
  width: number;
  height: number;
  length: number;
  category?: string;        // Opcional por ahora
  imageUrl?: string;        // Para el futuro
}