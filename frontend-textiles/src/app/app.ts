import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar';
import { ToastComponent } from './core/components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `<app-navbar></app-navbar>
             <router-outlet></router-outlet>
             <app-toast></app-toast>` // Ni una sola línea de HTML extra
})
export class App {}