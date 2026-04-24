import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html'
})
export class Catalog implements OnInit { // <-- Prometemos usar OnInit
  products: any[] = [];
  isLoading = true;
  private http = inject(HttpClient);

  // <-- AQUÍ ESTÁ LA FUNCIÓN QUE CUMPLE LA PROMESA
  ngOnInit() {
    console.log('Iniciando petición al backend...'); 
    
    this.http.get<any[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        console.log('¡Éxito! Datos recibidos:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error conectando al backend:', err);
        this.isLoading = false;
      }
    });
  }
}