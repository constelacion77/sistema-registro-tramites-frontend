import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavegacionService {
  constructor(private router:Router){}

  public reedirigirA(url:any[]):void{
    this.router.navigate(url);
  }

  public navegarABeneficiarios():void{
    this.router.navigate(['dashboard/beneficiarios']);
  }

  public navegarADocumentos():void{
    this.router.navigate(['dashboard/documentos']);
  }

  public navegarATramites():void{
    this.router.navigate(['dashboard/tramites']);
  }
}
