import { Component, inject, signal } from '@angular/core';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { TramiteService } from '../../../services/tramite/tramite.service';
import { TablaTramiteComponent } from "../../../components/tramite/tabla-tramite/tabla-tramite.component";
import { PaginacionService } from '../../../services/paginacion/paginacion.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { PaginadorComponent } from "../../../components/paginador/paginador.component";
import { AuthService } from '../../../services/autenticacion/auth.service';
import { BarraBusquedaComponent } from '../../../components/barra-busqueda/barra-busqueda.component';
import { FiltroBusqueda, filtroVacio } from '../../../interfaces/filtroBusqueda';

@Component({
  selector: 'app-tramites.component',
  imports: [TablaTramiteComponent, PaginadorComponent, BarraBusquedaComponent],
  templateUrl: './tramites.component.html',
})
export default class TramitesComponent {
  private navegacionService = inject(NavegacionService);
  public tramiteService = inject(TramiteService);
  private paginadorService = inject(PaginacionService);
  private notificacionService = inject(NotificacionService);
  public authService = inject(AuthService);
  public filtroBusqueda = signal<FiltroBusqueda>(filtroVacio());

  public nuevoTramite():void{
    this.navegacionService.reedirigirA(['dashboard/nuevo-tramite'])
  }

  public constructor(){
    this.tramiteService.tramites.set([]);
    this.obtenerTramites();
    this.filtroBusqueda.set(filtroVacio());
  }
  
  public obtenerTramites():void{ 
    this.tramiteService.busquedaTramitesPorCampos(
      this.paginadorService.paginaActual(),
      this.paginadorService.tamanioPagina(),
      this.filtroBusqueda()
    )
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

  public busquedaTramites(busqueda:string | null | undefined):void{
    const filtroBusqueda:FiltroBusqueda = {busqueda};
    this.filtroBusqueda.set(filtroBusqueda);
    this.paginadorService.irAPagina(0);
    
    this.tramiteService.busquedaTramitesPorCampos(
      this.paginadorService.paginaActual(),
      this.paginadorService.tamanioPagina(),
      filtroBusqueda
    ).subscribe({
      next: resp =>{
        this.tramiteService.tramites.set(resp.content);
        this.paginadorService.actualizarRespuesta(resp);
      },
      error: error =>{
        console.log(error);
      }
    })
  }
}
