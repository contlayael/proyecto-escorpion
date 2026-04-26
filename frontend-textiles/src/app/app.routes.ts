// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Cuando la ruta esté vacía, carga el catálogo directamente
  { path: '', loadComponent: () => import('./features/catalog/catalog').then(m => m.Catalog) },
  // Ruta carrito de compras
  { path: 'cart', loadComponent: () => import('./features/cart/cart').then(m => m.CartComponent) },
  // Redirección por seguridad si escriben una ruta que no existe
  { path: '**', redirectTo: '' } 
];