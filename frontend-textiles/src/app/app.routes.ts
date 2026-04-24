// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Cuando la ruta esté vacía, carga el catálogo directamente
  { 
    path: '', 
    loadComponent: () => import('./features/catalog/catalog').then(m => m.Catalog) 
  },
  // Redirección por seguridad si escriben una ruta que no existe
  { path: '**', redirectTo: '' } 
];