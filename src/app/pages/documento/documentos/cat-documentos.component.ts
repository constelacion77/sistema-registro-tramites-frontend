import { Component, inject, signal } from '@angular/core';
import { TablaDocumentosComponent } from "../../../components/documento/tabla-documentos/tabla-documentos.component";
import { DocumentoService } from '../../../services/documento/documento.service';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { PaginacionService } from '../../../services/paginacion/paginacion.service';
import { PaginadorComponent } from "../../../components/paginador/paginador.component";
import { NotificacionService } from '../../../services/notificacion/notificacion.service';
import { AuthService } from '../../../services/autenticacion/auth.service';
import { BarraBusquedaComponent } from '../../../components/barra-busqueda/barra-busqueda.component';
import { FiltroBusqueda, filtroVacio } from '../../../interfaces/filtroBusqueda';

@Component({
  selector: 'app-cat-documentos.component',
  imports: [TablaDocumentosComponent, PaginadorComponent, BarraBusquedaComponent],
  templateUrl: './cat-documentos.component.html'
})
export default class CatDocumentosComponent {
  public documentosService = inject(DocumentoService);
  private navegacionService = inject(NavegacionService);
  public paginacionService = inject(PaginacionService);
  private notificacionService = inject(NotificacionService);
  public authService = inject(AuthService);
  private filtroBusqueda = signal<FiltroBusqueda>(filtroVacio());

  constructor(){
    this.documentosService.documentos.set([]);
    this.cargarDocumentos();
  }
  
  public cargarDocumentos():void{
    this.documentosService.buscarPorParametro(
      this.paginacionService.paginaActual(),
      this.paginacionService.tamanioPagina(),
      this.filtroBusqueda()
    ).subscribe({
      next: (resp) => {
        this.documentosService.documentos.set(resp.content);
        this.paginacionService.actualizarRespuesta(resp);
      }
    });
  }

  public nuevoDocumento():void{
    this.navegacionService.reedirigirA(['/dashboard/nuevo-documento']);
  }

  public eliminarDocumento(idDocumentoEliminar:number):void{
    this.documentosService.eliminarDocumento(idDocumentoEliminar)
    .subscribe({
      next: (resp) => {
        this.cargarDocumentos();
        this.notificacionService.success('Información eliminada correctamente.');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public buscarDocumento(busqueda:string):void{
    const filtro:FiltroBusqueda = {busqueda};
    this.filtroBusqueda.set(filtro);
    this.paginacionService.irAPagina(0);
    
    this.documentosService.buscarPorParametro(
      this.paginacionService.paginaActual(),
      this.paginacionService.tamanioPagina(),
      filtro
    ).subscribe({
      next: resp =>{
        this.documentosService.documentos.set(resp.content);
        this.paginacionService.actualizarRespuesta(resp);
      },
      error: error =>{
        console.log(error);
      }
    })
  }
}
