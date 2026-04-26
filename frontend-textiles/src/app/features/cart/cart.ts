import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html'
})
export class CartComponent {
  public cartService = inject(CartService);

  // Usamos los signals directamente en la vista
  items = this.cartService.cart;
  total = this.cartService.totalPrice;

  increment(productId: number, currentQty: number) {
    this.cartService.updateQuantity(productId, currentQty + 1);
  }

  decrement(productId: number, currentQty: number) {
    this.cartService.updateQuantity(productId, currentQty - 1);
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}