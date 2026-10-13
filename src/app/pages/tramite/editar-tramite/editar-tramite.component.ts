import { Component, inject, signal } from '@angular/core';
import { TramiteService } from '../../../services/tramite/tramite.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FormularioTramiteComponent } from "../../../components/tramite/formulario-tramite/formulario-tramite.component";
import { TramiteRequest } from '../../../classes/tramiteRequest';
import { CardMessageComponent } from '../../../components/card-message/card-message.component';

@Component({
  selector: 'app-editar-tramite.component',
  imports: [FormularioTramiteComponent, CardMessageComponent],
  templateUrl: './editar-tramite.component.html',
})
export default class EditarTramiteComponent {
  private tramiteService = inject(TramiteService);
  private route = inject(ActivatedRoute);
  public tramite = signal<TramiteRequest | undefined>(new TramiteRequest);
  
  private idTramite = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('idTramite')))
    ),
    {initialValue:0}
  );

  public guardarTramite(tramite:TramiteRequest):void{
    this.tramiteService.guardarTramiteEditado(tramite);
  }

  public constructor(){
    this.tramiteService.obtenerTramitePorId(this.idTramite()).subscribe({
      next:(resp) =>{this.tramite.set(resp)},
      error:(error) =>{console.log(error)}
    })
  }
}
