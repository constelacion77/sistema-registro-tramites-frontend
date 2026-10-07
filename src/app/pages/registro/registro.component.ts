import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { NavegacionService } from '../../services/navegacion/navegacion.service';
import { DatosRegistro } from '../../interfaces/datosRegistro';
import { RouterModule } from '@angular/router';
import { FormularioUsuarioRegistroComponent } from "../../components/usuario/registro/formulario-usuario-registro.component";

@Component({
  selector: 'app-registro',
  imports: [RouterModule, FormularioUsuarioRegistroComponent],
  templateUrl: './registro.component.html'
})
export default class RegistroComponent {
  private authService = inject(AuthService);
  private notificacionService = inject(NotificacionService);
  private navegacionService = inject(NavegacionService);

  public error = '';

  public registrar(datos: DatosRegistro): void {
    this.authService.registro(datos).subscribe({
      next: () => {
        this.navegacionService.navegarATramites();
        this.notificacionService.success("Cuenta creada correctamente");
      },
      error: (error) => {
        this.error = error.error?.error || 'Error al registrar';
        console.log(error);
      }
    });
  }
}
