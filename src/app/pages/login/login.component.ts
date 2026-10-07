import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { NavegacionService } from '../../services/navegacion/navegacion.service';
import { Credenciales } from '../../interfaces/crendenciales';
import { FormularioUsuarioLoginComponent } from '../../components/usuario/login/formulario-usuario-login.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [FormularioUsuarioLoginComponent, RouterModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private notificacionService = inject(NotificacionService);
  private navegacionService = inject(NavegacionService);

  public error = '';

  public iniciarSesion(credenciales: Credenciales): void {
    this.authService.login(credenciales).subscribe({
      next: () => {
        this.navegacionService.navegarATramites();
        this.notificacionService.success("Sesión iniciada correctamente");
      },
      error: (error) => {
        this.error = error.error?.error || 'Error al iniciar sesión';
        console.log(error);
      }
    });
  }
}