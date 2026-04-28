import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Signals del carrito para el resumen
  items = this.cartService.cart;
  total = this.cartService.totalPrice;

  // Definición del formulario con validaciones
  checkoutForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Datos del pedido:', this.checkoutForm.value);
      console.log('Productos:', this.items());

      // Aquí iría la llamada al backend en el futuro
      this.toastService.show('¡Pedido realizado con éxito!');
      
      // Limpiamos carrito y redirigimos
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } else {
      this.toastService.show('Por favor, revisa los datos del formulario');
      this.checkoutForm.markAllAsTouched(); // Muestra errores visuales
    }
  }
}