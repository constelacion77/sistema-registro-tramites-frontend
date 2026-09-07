import { Component, inject, signal } from '@angular/core';
import { FormularioBeneficiarioComponent } from "../../../components/beneficiario/formulario-beneficiario/formulario-beneficiario.component";
import { Beneficiario } from '../../../classes/beneciario';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { ErrorResponse } from '../../../models/error-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-beneficiario.component',
  imports: [FormularioBeneficiarioComponent],
  templateUrl: './nuevo-beneficiario.component.html',
})
export default class NuevoBeneficiarioComponent {
  private beneficiarioService = inject(BeneficiarioService);
  public nuevoBeneficiario = signal<Beneficiario>(new Beneficiario);
  private notificacionService = inject(NotificacionService);
  private navegacionService = inject(NavegacionService);

  public guardarBeneficiario(beneficiario:Beneficiario):void{
    this.beneficiarioService.guardarNuevoBeneficiario(beneficiario)
    .subscribe({
      next:(resp:Beneficiario) =>{
        this.navegacionService.navegarABeneficiarios();
        this.notificacionService.success("Información guardada correctamente.")
      },
      error:(error:HttpErrorResponse) =>{
        const respuesta = error.error as ErrorResponse;
        this.notificacionService.danger(respuesta.message);
      }
    })
  }

  public cancelar():void{
    this.navegacionService.navegarABeneficiarios();
  }
}
