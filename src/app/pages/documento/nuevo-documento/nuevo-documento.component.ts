import { Component, inject, signal } from '@angular/core';
import { Documento } from '../../../classes/documento';
import { FormularioDocumentoComponent } from "../../../components/documento/formulario-documento/formulario-documento.component";
import { DocumentoService } from '../../../services/documento/documento.service';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-nuevo-documento.component',
  imports: [FormularioDocumentoComponent],
  templateUrl: './nuevo-documento.component.html'
})
export default class NuevoDocumentoComponent {
  public nuevoDocumento = signal<Documento>(new Documento);
  private documentoService = inject(DocumentoService);
  private notificacionService = inject(NotificacionService);
  private navegacionService = inject(NavegacionService);

  public guardarDocumento(documento:Documento):void{
    this.documentoService.guardarNuevoDocumento(documento)
    .subscribe({
      next:(resp) =>{
        this.navegacionService.navegarADocumentos();
        this.notificacionService.success("Información guardada correctamente");
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  public cancelar():void{
    this.navegacionService.navegarADocumentos();
  }
}
