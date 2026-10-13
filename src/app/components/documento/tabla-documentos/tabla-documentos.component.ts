import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { Documento } from '../../../classes/documento';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { AuthService } from '../../../services/autenticacion/auth.service';

@Component({
  selector: 'tabla-documentos',
  imports: [ConfirmDialogComponent],
  templateUrl: './tabla-documentos.component.html'
})
export class TablaDocumentosComponent {
  public documentos = input.required<Documento[]>();
  private nevegacionService = inject(NavegacionService);
  public idDocumento = signal<number>(0);
  public idDocumentoEliminar = output<number>();
  public authService = inject(AuthService);

  public editarDocumento(idDocumento:number):void{
    this.nevegacionService.reedirigirA(['/dashboard/editar-documento', idDocumento]);
  }

  public eliminarDocumento():void{
    if(this.idDocumento() === 0) return;
    this.idDocumentoEliminar.emit(this.idDocumento());
    this.idDocumento.set(0);
  }
}
