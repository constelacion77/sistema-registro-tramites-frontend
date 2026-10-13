import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import { NotificacionService } from '../services/notificacion/notificacion.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificacionService = inject(NotificacionService);

  if (authService.estaAutenticado()) {
    return true;
  }
  notificacionService.danger('Tú token no es valido o ha expirado, inicia sesión primero.');
  router.navigate(['/login']);
  return false;
};
