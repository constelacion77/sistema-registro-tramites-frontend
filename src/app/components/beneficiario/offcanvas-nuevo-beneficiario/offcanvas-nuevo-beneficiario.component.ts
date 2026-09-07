import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { Beneficiario } from '../../../classes/beneciario';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../../models/error-response';
import { Offcanvas } from 'bootstrap';
import { FormularioBeneficiarioComponent } from "../formulario-beneficiario/formulario-beneficiario.component";

@Component({
  selector: 'offcanvas-nuevo-beneficiario',
  imports: [FormularioBeneficiarioComponent],
  templateUrl: './offcanvas-nuevo-beneficiario.component.html'
})
export class OffcanvasNuevoBeneficiarioComponent {
  public nuevoBeneficiario = signal<Beneficiario>(new Beneficiario());
  private beneficiarioService = inject(BeneficiarioService);
  public idBeneficiario = output<number>();
  private notificacionService = inject(NotificacionService);

  public guardarBeneficiario(beneficiario:Beneficiario):void{
    this.beneficiarioService.guardarNuevoBeneficiario(beneficiario)
    .subscribe({
      next:(resp) =>{
        this.idBeneficiario.emit(resp.id);
        this.notificacionService.success("Información guardada correctamente.")
        this.cerrarOfcanvas();
      },
      error:(error: HttpErrorResponse) =>{
        const respuesta = error.error as ErrorResponse;
        this.notificacionService.danger(respuesta.message);
      }
    })
  }

  @ViewChild('offcanvasNuevoBeneficiario')
  offcanvasNuevoBeneficiaio!: ElementRef;
  public cerrarOfcanvas():void{
    this.nuevoBeneficiario.set(new Beneficiario());
    const element = this.offcanvasNuevoBeneficiaio.nativeElement;
    const offcanvas = Offcanvas.getOrCreateInstance(element);
    offcanvas.hide();
  }
}
