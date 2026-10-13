import { Component, inject, output } from '@angular/core';
import { DatosRegistro } from '../../../interfaces/datosRegistro';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'formulario-usuario-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario-registro.component.html',
})
export class FormularioUsuarioRegistroComponent {
  public registroOutput = output<DatosRegistro>();

  private fb = inject(NonNullableFormBuilder);

  public formRegistro = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public validarRegistro(): void {
    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }

    const usuario = this.formRegistro.getRawValue();

    this.registroOutput.emit(usuario);
  }
}
