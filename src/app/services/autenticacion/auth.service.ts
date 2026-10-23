import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../interfaces/authResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private http = inject(HttpClient);

  public registro (datos:{userName: string, email: string, password: string}):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/registro`,datos)
    .pipe(
      tap(resp => this.guardarSesion(resp))
    );
  }

  public login (datos:{userName: string, password: string}):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`,datos)
    .pipe(
    tap(resp => {
        this.guardarSesion(resp)
      })
    );
  }

  public logout ():void{
    localStorage.removeItem(this.tokenKey);
  }

  public obtenerToken():string | null{
    return localStorage.getItem(this.tokenKey);
  }
  
  public estaAutenticado():boolean{
    return !!this.obtenerToken();
  }

  private guardarSesion(resp:AuthResponse):void{
    localStorage.setItem(this.tokenKey, resp.token);
    localStorage.setItem("rol", resp.rol);
  }

  public esAdmin():boolean{
    return localStorage.getItem('rol') === 'ADMIN';
  }
}
