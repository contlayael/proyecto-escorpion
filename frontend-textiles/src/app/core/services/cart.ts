import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 1. El Signal principal: una lista de productos en el carrito
  // Lo inicializamos con lo que haya en LocalStorage o un array vacío
  private cartItems = signal<CartItem[]>(this.getCartFromStorage());

  // 2. Signals computados (se actualizan solos cuando cartItems cambia)
  public cart = this.cartItems.asReadonly(); // Versión de solo lectura para los componentes

  public totalItems = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  public totalPrice = computed(() => 
    this.cartItems().reduce((acc, item) => acc + (item.product.price_wholesale * item.quantity), 0)
  );

  // 3. Métodos para modificar el estado
  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.product.id === product.id);
      if (existingItem) {
        return items.map(i => 
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items => 
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
    this.saveToStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
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

  private getCartFromStorage(): CartItem[] {
    const saved = localStorage.getItem('cart_textiles');
    return saved ? JSON.parse(saved) : [];
  }
}