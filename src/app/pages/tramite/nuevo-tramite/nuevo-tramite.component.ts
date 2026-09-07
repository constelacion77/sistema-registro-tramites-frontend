import { Component, inject, signal } from '@angular/core';
import { FormularioTramiteComponent } from "../../../components/tramite/formulario-tramite/formulario-tramite.component";
import { TramiteRequest } from '../../../classes/tramiteRequest';
import { TramiteService } from '../../../services/tramite/tramite.service';

@Component({
  selector: 'app-nuevo-tramite.component',
  imports: [FormularioTramiteComponent],
  templateUrl: './nuevo-tramite.component.html',
})
export default class NuevoTramiteComponent {
  public nuevoTramite = signal<TramiteRequest>(new TramiteRequest);
  public tramiteService = inject(TramiteService);

  public guardarTramite(tramite:TramiteRequest):void{
    this.tramiteService.guardarNuevoTramite(tramite);
  }
}
