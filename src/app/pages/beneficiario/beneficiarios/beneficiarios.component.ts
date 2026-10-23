import { Component, inject, signal } from '@angular/core';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { TablaBeneficiarioComponent } from "../../../components/beneficiario/tabla-beneficiario/tabla-beneficiario.component";
import { PaginacionService } from '../../../services/paginacion/paginacion.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { PaginadorComponent } from "../../../components/paginador/paginador.component";
import { MessageService } from '../../../services/message/message.service';
import { BarraBusquedaComponent } from '../../../components/barra-busqueda/barra-busqueda.component';
import { FiltroBusqueda, filtroVacio } from '../../../interfaces/filtroBusqueda';

@Component({
  selector: 'app-beneficiarios.component',
  imports: [TablaBeneficiarioComponent, PaginadorComponent, BarraBusquedaComponent],
  templateUrl: './beneficiarios.component.html',
})
export default class BeneficiariosComponent {
  public beneficiarioService = inject(BeneficiarioService);
  private navegacionService = inject(NavegacionService);
  public paginacionService = inject(PaginacionService);
  private notificacionService = inject(NotificacionService);
  private filtroBusqueda = signal<FiltroBusqueda>(filtroVacio());

  public nuevoBeneficiario():void{
    this.navegacionService.reedirigirA(['dashboard/nuevo-beneficiario']);
  }

  constructor(){
    this.beneficiarioService.beneficiarios.set([]);
    this.obtenerBeneficiarios();
  }

  public obtenerBeneficiarios():void{
    this.beneficiarioService.buscarBeneficiariosPorParametros(
      this.paginacionService.paginaActual(),
      this.paginacionService.tamanioPagina(),
      this.filtroBusqueda()
    )
    .subscribe({
      next: (resp) => {
        this.beneficiarioService.beneficiarios.set(resp.content);
        this.paginacionService.actualizarRespuesta(resp);
        
      },
      error: (error) =>{
      }
    })
  }

  public eliminarBeneficiario(idBeneficiarioEliminar:number):void{
    this.beneficiarioService.eliminarBeneficiario(idBeneficiarioEliminar)
    .subscribe({
      next: (resp) =>{
        this.obtenerBeneficiarios();
        this.notificacionService.success('Información eliminada correctamente.');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  public buscarBeneficiarios(busqueda:string):void{
    const filtro:FiltroBusqueda = {busqueda};
    this.filtroBusqueda.set(filtro);
    this.paginacionService.irAPagina(0);
    
    this.beneficiarioService.buscarBeneficiariosPorParametros(
      this.paginacionService.paginaActual(),
      this.paginacionService.tamanioPagina(),
      filtro
    ).subscribe({
      next: resp =>{
        this.beneficiarioService.beneficiarios.set(resp.content);
        this.paginacionService.actualizarRespuesta(resp);
      },
      error: error =>{
        console.log(error);
      }
    })
  }
}
