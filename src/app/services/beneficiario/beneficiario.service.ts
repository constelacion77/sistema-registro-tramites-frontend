import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Beneficiario } from '../../classes/beneciario';
import { environment } from '../../environments/environment';
import { NavegacionService } from '../navegacion/navegacion.service';
import { NotificacionService } from '../notificacion/notificacion.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { OpcionSelect } from '../../interfaces/opcion-select';
import { construirParametros } from '../../utils/paramsContructor';
import { FiltroBusqueda } from '../../interfaces/filtroBusqueda';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private http = inject(HttpClient);
  public beneficiarios = signal<Beneficiario[]>([])
  private navegacionService = inject(NavegacionService);
  private notificacionService = inject(NotificacionService);

  public obtenerOpcionesBeneficiario():Observable<OpcionSelect[]>{
    return this.http.get<OpcionSelect[]>(`${environment.apiUrl}/beneficiarios/opciones`);
  }

  public guardarNuevoBeneficiario(beneficiario:Beneficiario):Observable<Beneficiario>{
    return this.http.post<Beneficiario>(`${environment.apiUrl}/beneficiarios`,beneficiario);
  }
  
  public guardarBeneficiarioEditado(beneficiario:Beneficiario):void{
    this.http.put(`${environment.apiUrl}/beneficiarios`,beneficiario)
    .subscribe({
      next: (resp) =>{
        this.navegacionService.reedirigirA(['dashboard/beneficiarios']);
        this.notificacionService.success('Información actualizada correctamente');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  public obtenerBeneficiarioPorId(idBeneficiario:number):Beneficiario | undefined{
    return this.beneficiarios().find(e => e.id === idBeneficiario);
  }

  public eliminarBeneficiario(idBeneficiario:number):Observable<Object>{
    return this.http.delete(`${environment.apiUrl}/beneficiarios/${idBeneficiario}`);
  }

  public buscarBeneficiariosPorParametros(page:number,size:number,filtroBusqueda:FiltroBusqueda):Observable<Page<Beneficiario>>{
    const params = construirParametros(filtroBusqueda,page,size);
    return this.http.get<Page<Beneficiario>>(`${environment.apiUrl}/beneficiarios/busqueda`,{params});
  }
}
