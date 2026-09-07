import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { Documento } from '../../../classes/documento';
import { DocumentoService } from '../../../services/documento/documento.service';
import { FormularioDocumentoComponent } from "../formulario-documento/formulario-documento.component";
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'offcanvas-nuevo-documento',
  imports: [FormularioDocumentoComponent],
  templateUrl: './offcanvas-nuevo-documento.component.html'
})
export class OffcanvasNuevoDocumentoComponent {
  private documentoService = inject(DocumentoService);
  public nuevoDocumento = signal<Documento>(new Documento());
  public idDocumento = output<number>();
  private notificacionService = inject(NotificacionService);

  public guardarNuevoDocumento(documento: Documento): void {
    this.documentoService.guardarNuevoDocumento(documento)
      .subscribe({
        next: (resp) => {
          this.idDocumento.emit(resp.id);
          this.notificacionService.success("Información guardada correctamente.")     
          this.cerrarOffcanvas();
        },
        error: (error) => { console.log(error); }
      })
  }

  @ViewChild('offcanvasNuevoDocumento')
  offcanvasNuevoDocumento!: ElementRef;
  public cerrarOffcanvas(): void {
    this.nuevoDocumento.set(new Documento());
    const elemento = this.offcanvasNuevoDocumento.nativeElement;
    const offcanvas = Offcanvas.getOrCreateInstance(elemento);
    offcanvas.hide();
  }

  public cancelar():void{
    this.cerrarOffcanvas();
  }
}
