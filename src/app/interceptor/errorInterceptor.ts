// interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificacionService } from '../services/notificacion/notificacion.service';
import { AuthService } from '../services/autenticacion/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificacionService = inject(NotificacionService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      let mensaje = 'Ocurrió un error inesperado.';

      if (error.status === 0) {
        mensaje = 'No se pudo conectar con el servidor.';
      } else if (error.status === 401) {
        // Token expirado o no autorizado → cerrar sesión
        authService.logout();
        router.navigate(['/login']);
        mensaje = 'Tu sesión expiró. Inicia sesión nuevamente.';
      } else if (error.status === 403) {
        mensaje = 'No tienes permisos para realizar esta acción.';
      } else if (error.status === 400 || error.status === 404 || error.status === 500) {
        // Intentar extraer el mensaje del cuerpo
        mensaje = error.error?.error || error.error?.message || mensaje;
      }

      notificacionService.danger(mensaje);
      return throwError(() => error);
    })
  );
};
