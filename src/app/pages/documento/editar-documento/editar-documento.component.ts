import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DocumentoService } from '../../../services/documento/documento.service';
import { Documento } from '../../../classes/documento';
import { FormularioDocumentoComponent } from "../../../components/documento/formulario-documento/formulario-documento.component";
import { NavegacionService } from '../../../services/navegacion/navegacion.service';

@Component({
  selector: 'app-editar-documento.component',
  imports: [FormularioDocumentoComponent],
  templateUrl: './editar-documento.component.html',
})
export default class EditarDocumentoComponent {
  private route = inject(ActivatedRoute);
  private documentoService = inject(DocumentoService);
  private navegacionService = inject(NavegacionService);

  public documentoEditar = computed(() => this.documentoService.obtenerDocumentoPorId(this.idDocumento()));

  public idDocumento = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('idDocumento')))
    ),
    {initialValue: 0}
  );

  public guardarDocumentoEditado(documento:Documento):void{
    this.documentoService.guardarDocumentoEditado(documento);
  }

  public cancelar():void{
    this.navegacionService.navegarADocumentos();
  }

}
