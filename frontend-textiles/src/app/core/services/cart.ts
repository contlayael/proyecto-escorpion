import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 1. El Signal principal: una lista de productos en el carrito
  // Lo inicializamos con lo que haya en LocalStorage o un array vacío
  private cartItems = signal<Product[]>(this.getCartFromStorage());

  // 2. Signals computados (se actualizan solos cuando cartItems cambia)
  public cart = this.cartItems.asReadonly(); // Versión de solo lectura para los componentes

  public totalItems = computed(() => 
    this.cartItems().length
  );

  public totalPrice = computed(() => 
    this.cartItems().reduce((acc, item) => acc + Number(item.price_wholesale), 0)
  );

  // 3. Métodos para modificar el estado
  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);
    this.saveToStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(p => p.id !== productId));
    this.saveToStorage();
  }

  clearCart() {
    this.cartItems.set([]);
    this.saveToStorage();
  }

  // Persistencia en LocalStorage
  private saveToStorage() {
    localStorage.setItem('cart_textiles', JSON.stringify(this.cartItems()));
  }

  private getCartFromStorage(): Product[] {
    const saved = localStorage.getItem('cart_textiles');
    return saved ? JSON.parse(saved) : [];
  }
}