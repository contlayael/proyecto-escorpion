// src/app/core/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // <-- IMPORTANTE: Importar sin el ".development"
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  //private apiUrl = 'http://localhost:3000/products'; // La ruta de nuestro NestJS
  private apiUrl = `${environment.apiUrl}/products`
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}