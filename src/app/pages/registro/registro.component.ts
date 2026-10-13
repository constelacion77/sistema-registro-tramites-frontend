import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { NavegacionService } from '../../services/navegacion/navegacion.service';
import { DatosRegistro } from '../../interfaces/datosRegistro';
import { RouterModule } from '@angular/router';
import { FormularioUsuarioRegistroComponent } from "../../components/usuario/registro/formulario-usuario-registro.component";

@Component({
  selector: 'app-registro',
  imports: [RouterModule, FormularioUsuarioRegistroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent {
  private authService = inject(AuthService);
  private notificacionService = inject(NotificacionService);
  private navegacionService = inject(NavegacionService);

  public error = signal<string>('');

  public registrar(datos: DatosRegistro): void {
    this.authService.registro(datos).subscribe({
      next: () => {
        this.navegacionService.navegarAlLogin();
        this.notificacionService.success("Cuenta creada correctamente.");
      },
      error: (error) => {
        this.error.set(error.error?.error || 'Error al registrar');
        console.log(error);
      }
    });
  }
}
