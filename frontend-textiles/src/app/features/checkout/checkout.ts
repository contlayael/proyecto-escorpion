import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast';
import { OrderService } from '../../core/services/order'; // <-- Importamos el nuevo servicio

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
  private orderService = inject(OrderService); // <-- Lo inyectamos
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
      // 1. Extraemos los valores del formulario
      const formValues = this.checkoutForm.value;
      console.log('Datos del pedido:', this.checkoutForm.value);
      console.log('Productos:', this.items());

      // 2. Transformamos el carrito al formato exacto que pide NestJS (CreateOrderDto)
      const orderItems = this.items().map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: Number(item.product.price_wholesale) // Aseguramos que sea número
      }));

      // 3. Armamos el payload final
      const payload = {
        ...formValues,
        total: this.total(),
        items: orderItems
      };

      // 4. Disparamos el misil al Backend
      this.orderService.createOrder(payload).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.toastService.show('¡Pedido guardado con éxito en la base de datos! 🎉');
          // Aquí iría la llamada al backend en el futuro
          this.toastService.show('¡Pedido realizado con éxito!');
      
      // Limpiamos carrito y redirigimos
      this.cartService.clearCart();
      this.router.navigate(['/']);
      },
        error: (error) => {
          console.error('Error al guardar el pedido:', error);
          this.toastService.show('Hubo un error de conexión con el servidor ❌');
        }
      });
    } else {
      this.toastService.show('Por favor, revisa los datos del formulario');
      this.checkoutForm.markAllAsTouched(); // Muestra errores visuales
    }
  }
}