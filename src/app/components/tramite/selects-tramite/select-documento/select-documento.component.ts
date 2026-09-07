import { Component, input, output } from '@angular/core';
import { Documento } from '../../../../classes/documento';

@Component({
  selector: 'select-documento',
  imports: [],
  templateUrl: './select-documento.component.html',
})
export class SelectDocumentoComponent {
  public documentos = input.required<Documento[]>();
  public idDocumento = output<number>();

  public seleccionarDocumento(event:Event):void{
    const select = event.target as HTMLSelectElement;
    this.idDocumento.emit(Number(select.value));
  }
}
