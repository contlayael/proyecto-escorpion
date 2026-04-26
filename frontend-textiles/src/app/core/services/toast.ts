import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Signals para controlar el estado
  message = signal<string>('');
  isVisible = signal<boolean>(false);

  show(msg: string) {
    this.message.set(msg);
    this.isVisible.set(true);

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      this.isVisible.set(false);
    }, 3000);
  }
}