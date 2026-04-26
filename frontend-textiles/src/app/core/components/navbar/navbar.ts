import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  private cartService = inject(CartService);

  // Exponemos los signals al HTML
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;
}