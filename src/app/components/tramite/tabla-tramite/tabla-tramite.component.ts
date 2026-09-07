import { Component, inject, input, output, signal } from '@angular/core';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { TramiteService } from '../../../services/tramite/tramite.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { TramiteResponse } from '../../../classes/tramiteResponse';

@Component({
  selector: 'tabla-tramite',
  imports: [ConfirmDialogComponent],
  templateUrl: './tabla-tramite.component.html'
})
export class TablaTramiteComponent {
  public tramites = input.required<TramiteResponse[]>();
  private nevegacionService = inject(NavegacionService);
  public idTramite = signal<number>(0);
  public TramiteService = inject(TramiteService);
  public idTramiteEliminar = output<number>();

  public editarTramite(idTramite:number):void{
    this.nevegacionService.reedirigirA(['/dashboard/editar-tramite', idTramite]);
  }

  public eliminarTramite():void{
    if(this.idTramite() === 0) return;
    this.idTramiteEliminar.emit(this.idTramite());
    // this.TramiteService.eliminarTramite(this.idTramite());
    this.idTramite.set(0);
  }
}
