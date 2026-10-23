import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { NavegacionService } from '../navegacion/navegacion.service';
import { TramiteResponse } from '../../classes/tramiteResponse';
import { TramiteRequest } from '../../classes/tramiteRequest';
import { catchError, Observable, of } from 'rxjs';
import { NotificacionService } from '../notificacion/notificacion.service';
import { Page } from '../../models/page';
import { FiltroBusqueda } from '../../interfaces/filtroBusqueda';
import { construirParametros } from '../../utils/paramsContructor';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  private http = inject(HttpClient);
  public tramites = signal<TramiteResponse[]>([]);
  private navegacionService = inject(NavegacionService);
  private notificacionService = inject(NotificacionService);

  public guardarNuevoTramite(tramite:TramiteRequest):void{
    this.http.post(`${environment.apiUrl}/tramites`,tramite).subscribe({
      next: (resp) =>{
        this.navegacionService.reedirigirA(['dashboard/tramites']);
        this.notificacionService.success('Información guardada correctamente');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }
  
  public guardarTramiteEditado(tramite:TramiteRequest):void{
    this.http.put(`${environment.apiUrl}/tramites`,tramite).subscribe({
      next: (resp) =>{
        this.navegacionService.reedirigirA(['dashboard/tramites']);
        this.notificacionService.success('Información actualizada correctamente');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  public obtenerTramitePorId(idTramite:number):Observable<TramiteRequest | undefined>{
    return this.http.get<TramiteRequest>(`${environment.apiUrl}/tramites/${idTramite}`).pipe(
      catchError((error) =>{
        console.error(error);
        return of(undefined);
      })
    )
  }

  public eliminarTramite(idTramite:number):Observable<Object>{
    return this.http.delete(`${environment.apiUrl}/tramites/${idTramite}`);
  }

  public busquedaTramitesPorCampos(page:number, size:number, busqueda:FiltroBusqueda):Observable<Page<TramiteResponse>>{
    const params = construirParametros(busqueda, page, size);
    return this.http.get<Page<TramiteResponse>>(`${environment.apiUrl}/tramites/busqueda`,{params});
  }
}
