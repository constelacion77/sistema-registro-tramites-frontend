import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { Documento } from '../../../classes/documento';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'tabla-documentos',
  imports: [ConfirmDialogComponent],
  templateUrl: './tabla-documentos.component.html'
})
export class TablaDocumentosComponent {
  public documentos = input.required<Documento[]>();
  private nevegacionService = inject(NavegacionService);
  public idDocumento = signal<number>(0);
  // public documentoService = inject(DocumentoService);
  // private paginacionService = inject(PaginacionService);
  // private notificacionService = inject(NotificacionService);
  public idDocumentoEliminar = output<number>();

  public editarDocumento(idDocumento:number):void{
    this.nevegacionService.reedirigirA(['/dashboard/editar-documento', idDocumento]);
  }

  // @ViewChild('confirmDialog') modalElement!: ElementRef;
  // private modalInstance: any;
  // public abrirModal(idDocumento:number, modalHtmlElement: HTMLElement):void{
  //   this.idDocumento.set(idDocumento);

  //   if (!this.modalInstance) {
  //     this.modalInstance = new Modal(modalHtmlElement);
  //   }
  //   this.modalInstance.show();
  // }

  public eliminarDocumento():void{
    if(this.idDocumento() === 0) return;
    this.idDocumentoEliminar.emit(this.idDocumento());
  //   this.documentoService.eliminarDocumento(this.idDocumento())
  //   .subscribe({
  //     next: (resp) => {
  //       this.documentoService.cargarDocumentos(
  //         this.paginacionService.paginaActual(),
  //         this.paginacionService.tamanioPagina()
  //       );
  //       this.notificacionService.success('Información eliminada correctamente.');
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
    this.idDocumento.set(0);
  }
}
