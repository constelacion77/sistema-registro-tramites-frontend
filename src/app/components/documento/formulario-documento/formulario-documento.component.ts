import { Component, effect, inject, input, output } from '@angular/core';
import { Documento } from '../../../classes/documento';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'formulario-documento',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-documento.component.html',
})
export class FormularioDocumentoComponent {
  public documento = input.required<Documento>();
  public documentoOutput = output<Documento>();
  public cancelarEvent = output<void>();

  private fb = inject(NonNullableFormBuilder);

  public formDocumento = this.fb.group({
    nombre: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150)
    ]],
    costo: [0, [
        Validators.required
    ]],
    descripcion: ['', [
        Validators.maxLength(200)
    ]],
    activo:[true,[]]
  });

  constructor(){
    effect(() => {
      const documento = this.documento();
      this.formDocumento.reset({
        nombre: documento.nombre,
        costo: documento.costo,
        descripcion: documento.descripcion,
        activo: documento.activo
      })
    });
  }

  public validarDocumento():void{
    if(this.formDocumento.invalid){
      this.formDocumento.markAllAsTouched();
      return;
    }

    const documento = {
      ...this.documento(),
      ...this.formDocumento.getRawValue()
    }

    this.guardarDocumento(documento);
  }

  private guardarDocumento(documento:Documento):void{
    this.documentoOutput.emit(documento);
  }

  public cancelar():void{
    this.cancelarEvent.emit();
  }
}
