import { Component, input, output } from '@angular/core';
import { Beneficiario } from '../../../../classes/beneciario';

@Component({
  selector: 'select-beneficiario',
  imports: [],
  templateUrl: './select-beneficiario.component.html',
})
export class SelectBeneficiarioComponent {
  public beneficiarios = input.required<Beneficiario[]>();
  public idBeneficiario = output<number>();

  public seleccionarBeneficiario(event:Event):void{
    const select = event.target as HTMLSelectElement;
    this.idBeneficiario.emit(Number(select.value));
  }

}
