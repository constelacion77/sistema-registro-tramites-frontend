import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavegacionService {
  private location = inject(Location);


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

  public navegarAlLogin():void{
    this.router.navigate(['/login']);
  }

  public inicio():void{
    this.router.navigate(['/dashboard']);
  }
}
