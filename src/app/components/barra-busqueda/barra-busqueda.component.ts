import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'barra-busqueda',
  imports: [FormsModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css',
})
export class BarraBusquedaComponent {
  public busqueda = output<string>();
  public parametro:string = "";

  public buscar():void{
    this.busqueda.emit(this.parametro);
  }
}
