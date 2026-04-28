import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders'; // La ruta de nuestro NestJS

  createOrder(orderPayload: any): Observable<any> {
    return this.http.post(this.apiUrl, orderPayload);
  }
}