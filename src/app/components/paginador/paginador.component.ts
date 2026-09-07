import { ChangeDetectorRef, Component, computed, effect, inject, output } from '@angular/core';
import { PaginacionService } from '../../services/paginacion/paginacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'paginador',
  imports: [CommonModule],
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {
  public paginacionService = inject(PaginacionService);
  public actualizarEstado = output<void>();

  public irAPagina(pagina:number):void{
    this.paginacionService.irAPagina(pagina);
    this.actualizar();
  }

  public anterior():void{
    this.paginacionService.paginaAnterior();
    this.actualizar();
  }

  public siguiente():void{
    this.paginacionService.siguientePagina();
    this.actualizar();
  }
  
  public actualizar():void{
    this.actualizarEstado.emit();
  }

  public cambiarTamanioPagina(event: Event): void {
    const select = event.target as HTMLSelectElement;

    const tamanio = Number(select.value);

    this.paginacionService.tamanioPagina.set(tamanio);
    this.paginacionService.paginaActual.set(0);
    
    this.actualizar();
}
}
