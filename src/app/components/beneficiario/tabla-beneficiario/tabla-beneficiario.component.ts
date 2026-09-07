import { Component, inject, input, output, signal } from '@angular/core';
import { Beneficiario } from '../../../classes/beneciario';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';

@Component({
  selector: 'tabla-beneficiario',
  imports: [ConfirmDialogComponent],
  templateUrl: './tabla-beneficiario.component.html'
})
export class TablaBeneficiarioComponent {
  public beneficiarios = input.required<Beneficiario[]>();
  private nevegacionService = inject(NavegacionService);
  public idBeneficiario = signal<number>(0);
  public beneficiarioService = inject(BeneficiarioService);
  // private notificacionService = inject(NotificacionService);
  public idBeneficiarioEliminar = output<number>();

  public editarBeneficiario(idBeneficiario:number):void{
    this.nevegacionService.reedirigirA(['/dashboard/editar-beneficiario', idBeneficiario]);
  }

  public eliminarBeneficiario():void{
    if(this.idBeneficiario() === 0) return;
    this.idBeneficiarioEliminar.emit(this.idBeneficiario());
    // this.beneficiarioService.eliminarBeneficiario(this.idBeneficiario())
    // .subscribe({
    //   next: (resp) =>{
    //     // this.obtenerBeneficiarios();
    //     this.notificacionService.success('Información eliminada correctamente');
    //   },
    //   error: (error) =>{
    //     console.log(error);
    //   }
    // });
    this.idBeneficiario.set(0);
  }
}
