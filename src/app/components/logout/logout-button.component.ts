import { Component } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logout-button',
  imports: [],
  template: `
      <button class="btn btn-outline-danger btn-md w-3" (click)="cerrarSesion()" title="Cerrar sesión">
        <i class="bi bi-power m-2"></i>
      </button>
  `
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService, private router: Router) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
