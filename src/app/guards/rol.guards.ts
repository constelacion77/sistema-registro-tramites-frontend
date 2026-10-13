import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/autenticacion/auth.service';
import { NotificacionService } from '../services/notificacion/notificacion.service';
import { NavegacionService } from '../services/navegacion/navegacion.service';

export const rolGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const navegacion = inject(NavegacionService);
  const notificacionService = inject(NotificacionService);

  if (authService.esAdmin()) {
    return true;
  }
  navegacion.inicio();
  notificacionService.danger('No tienes permisos para realizar esta acción.');
  return false;
};
