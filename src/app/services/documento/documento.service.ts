import { inject, Injectable, signal } from '@angular/core';
import { Documento } from '../../classes/documento';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments.development';
import { NavegacionService } from '../navegacion/navegacion.service';
import { NotificacionService } from '../notificacion/notificacion.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { OpcionSelect } from '../../interfaces/opcion-select';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private http = inject(HttpClient);
  public documentos = signal<Documento[]>([]);
  private navigacionService = inject(NavegacionService);
  private notificacionService = inject(NotificacionService);

  // public constructor(){this.cargarDocumentos()}
  
  public cargarDocumentos(page:number, size:number):Observable<Page<Documento>>{
    return this.http.get<Page<Documento>>(`${environment.apiUrl}/documentos`,
      {
        params:{
          page: page,
          size: size
        }
      }
    );
    // .subscribe({
    //   next: (resp) => {
    //     this.documentos.set(resp.content);
    //     this.paginacionService.actualizarRespuesta(resp);
    //   }
    // })
  }

  public obtenerOpcionesDocumento():Observable<OpcionSelect[]>{
    return this.http.get<OpcionSelect[]>(`${environment.apiUrl}/documentos/opciones`);
  }

  public guardarNuevoDocumento(documento:Documento):Observable<Documento>{
    return this.http.post<Documento>(`${environment.apiUrl}/documentos`,documento);
    // .subscribe({
    //   next: (resp) => {
    //     this.navigacionService.reedirigirA(['/dashboard/documentos']);
    //     this.notificacionService.success('Informacion guardada correctamente');
    //   },
    //   error: (error) => {

    //   }
    // })
  }

  public guardarDocumentoEditado(documento:Documento):void{
    this.http.put(`${environment.apiUrl}/documentos`,documento).subscribe({
      next: (resp) => {
        this.navigacionService.reedirigirA(['/dashboard/documentos']);
        this.notificacionService.success('Informacion actualizada correctamente');
      },
      error: (error) => {

      }
    })
  }

  public eliminarDocumento(idDocumento:number):Observable<Object>{
    return this.http.delete(`${environment.apiUrl}/documentos/${idDocumento}`);
    // .subscribe({
    //   next: (resp) => {
    //     // this.cargarDocumentos();
    //     this.notificacionService.success('Informacion eliminada correctamente');
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  }

  public obtenerDocumentoPorId(idDocumento:number):Documento | undefined{
    return this.documentos().find(e => e.id === idDocumento);
  }
}
