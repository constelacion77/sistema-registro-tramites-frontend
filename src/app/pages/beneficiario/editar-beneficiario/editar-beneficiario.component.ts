import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { Beneficiario } from '../../../classes/beneciario';
import { FormularioBeneficiarioComponent } from "../../../components/beneficiario/formulario-beneficiario/formulario-beneficiario.component";
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { CardMessageComponent } from '../../../components/card-message/card-message.component';

@Component({
  selector: 'app-editar-beneficiario.component',
  imports: [FormularioBeneficiarioComponent, CardMessageComponent],
  templateUrl: './editar-beneficiario.component.html',
})
export default class EditarBeneficiarioComponent {
  private route = inject(ActivatedRoute);
  private beneficiarioService = inject(BeneficiarioService);
  public beneficiario = computed(() => this.beneficiarioService.obtenerBeneficiarioPorId(this.idBeneficiario()));
  public navegacionService = inject(NavegacionService);

  private idBeneficiario = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('idBeneficiario')))
    ),
    {initialValue:0}
  )

  public guardarBeneficiario(beneficiario:Beneficiario):void{
    this.beneficiarioService.guardarBeneficiarioEditado(beneficiario);
  }

  public cancelar():void{
    this.navegacionService.navegarABeneficiarios();
  }
}
