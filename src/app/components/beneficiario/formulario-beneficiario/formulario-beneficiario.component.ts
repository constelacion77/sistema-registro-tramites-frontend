import { Component, effect, inject, input, output } from '@angular/core';
import { Beneficiario } from '../../../classes/beneciario';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';

@Component({
  selector: 'formulario-beneficiario',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-beneficiario.component.html',
})
export class FormularioBeneficiarioComponent {
  public beneficiario = input.required<Beneficiario>();
  public beneficiarioOutput = output<Beneficiario>();
  // public navegacionService = inject(NavegacionService);
  public cancelarEvent = output<void>();

  private fb = inject(NonNullableFormBuilder);

  public formBeneficiario = this.fb.group({
    nombre: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    apellidos:['',[
      Validators.maxLength(150)
    ]],
    curp:['',[
      Validators.required,
      Validators.maxLength(18)
    ]]
  });

  constructor(){
    effect(() =>{
      const beneficiario = this.beneficiario();
      this.formBeneficiario.reset({
        nombre: beneficiario.nombre,
        apellidos: beneficiario.apellidos,
        curp: beneficiario.curp
      })
    })
  };

  public validarBeneficario():void{
    if(this.formBeneficiario.invalid){
      this.formBeneficiario.markAllAsTouched();
      return;
    }

    const beneficiario = {
      ...this.beneficiario(),
      ...this.formBeneficiario.getRawValue()
    }

    this.guardarBeneficiario(beneficiario);
  }

  public guardarBeneficiario(beneficiario:Beneficiario):void{
    this.beneficiarioOutput.emit(beneficiario);
  }

  public cancelar():void{
    this.cancelarEvent.emit();
    // this.navegacionService.reedirigirA(['dashboard/beneficiarios']);
  }
}
