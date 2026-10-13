import { Component, inject } from '@angular/core';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { TramiteService } from '../../../services/tramite/tramite.service';
import { TablaTramiteComponent } from "../../../components/tramite/tabla-tramite/tabla-tramite.component";
import { PaginacionService } from '../../../services/paginacion/paginacion.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { PaginadorComponent } from "../../../components/paginador/paginador.component";
import { AuthService } from '../../../services/autenticacion/auth.service';

@Component({
  selector: 'app-tramites.component',
  imports: [TablaTramiteComponent, PaginadorComponent],
  templateUrl: './tramites.component.html',
})
export default class TramitesComponent {
  private navegacionService = inject(NavegacionService);
  public tramiteService = inject(TramiteService);
  private paginadorService = inject(PaginacionService);
  private notificacionService = inject(NotificacionService);
  public authService = inject(AuthService);

  public nuevoTramite():void{
    this.navegacionService.reedirigirA(['dashboard/nuevo-tramite'])
  }

  public constructor(){
    this.tramiteService.tramites.set([]);
    this.obtenerTramites();
  }
  
  public obtenerTramites():void{
    this.tramiteService.obtenerTramites(this.paginadorService.paginaActual(), this.paginadorService.tamanioPagina())
    .subscribe({
      next:(resp) =>{
        this.paginadorService.actualizarRespuesta(resp);
        this.tramiteService.tramites.set(resp.content);
      },
      error: (error) =>{console.log(error);}
    });
  }

  public eliminarTramite(idTramiteEliminar:number):void{
    this.tramiteService.eliminarTramite(idTramiteEliminar).subscribe({
      next:(resp) =>{
        this.obtenerTramites();
        this.notificacionService.success("Información eliminada correctamente.");
      },
      error:(error) =>{
        this.notificacionService.danger("Ha sucedido un error.");
      }
    })
  }
}
