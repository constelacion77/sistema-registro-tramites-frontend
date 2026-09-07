import { computed, Injectable, signal } from '@angular/core';
import { Page } from '../../models/page';

@Injectable()
export class PaginacionService {
  public paginaActual = signal<number>(0);
  public tamanioPagina = signal<number>(5);
  public totalRegistros = signal<number>(0);
  public totalPaginas = signal<number>(0);
  public primeraPagina = signal<boolean>(true);
  public ultimaPagina = signal<boolean>(false);

  public paginas = computed(() =>
    Array.from({  
      length: this.totalPaginas()
    }, (_, i) => i)
  );

  public actualizarRespuesta<T>(pagina:Page<T>):void{
    this.paginaActual.set(pagina.number);
    this.tamanioPagina.set(pagina.size);
    this.totalRegistros.set(pagina.totalElements);
    this.totalPaginas.set(pagina.totalPages);
    this.primeraPagina.set(pagina.first);
    this.ultimaPagina.set(pagina.last);
  }

  public irAPagina(pagina:number):void{
    this.paginaActual.set(pagina);
  }

  public siguientePagina():void{
    if(!this.ultimaPagina()){
      this.paginaActual.update(p => p + 1);
    }
  }

  public paginaAnterior():void{
    if(!this.primeraPagina()){
      this.paginaActual.update(p => p - 1);
    }
  }
}
