import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // <-- IMPORTANTE: Importar sin el ".development"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  //private apiUrl = 'http://localhost:3000/products'; // La ruta de nuestro NestJS
  private apiUrl = `${environment.apiUrl}/orders`;

  createOrder(orderPayload: any): Observable<any> {
    return this.http.post(this.apiUrl, orderPayload);
  }
}