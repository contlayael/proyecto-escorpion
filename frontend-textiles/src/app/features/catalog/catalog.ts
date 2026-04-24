import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cart';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html'
})
export class Catalog implements OnInit { // <-- Prometemos usar OnInit
  products: Product[] = [];
  isLoading = true;
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService); // Inyectamos el nuevo servicio

  // <-- AQUÍ ESTÁ LA FUNCIÓN QUE CUMPLE LA PROMESA
  ngOnInit() {
    // 1. Generamos un número único basado en la hora actual
    const cacheBuster = new Date().getTime();
    console.log('Iniciando petición al backend...'); 
    
    // 2. Lo inyectamos en la URL (?cb=123456789)
    this.http.get<any[]>(`http://localhost:3000/products?cb=${cacheBuster}`).subscribe({
      next: (data) => {
        console.log('¡Éxito! Datos recibidos:', data);
        this.products = data;
        this.isLoading = false;
        // <-- EL CODAZO MÁGICO: Obliga al HTML a reaccionar y dibujarse
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error conectando al backend:', err);
        this.isLoading = false;
        this.cdr.detectChanges();// También avisamos si hay error
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} agregado al carrito`); // Temporal, luego pondremos algo más pro
  }
}