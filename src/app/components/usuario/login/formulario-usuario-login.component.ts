import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credenciales } from '../../../interfaces/crendenciales';

@Component({
  selector: 'formulario-usuario-login',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario-login.component.html'
})
export class FormularioUsuarioLoginComponent {
  public loginOutput = output<Credenciales>();

  private fb = inject(NonNullableFormBuilder);

  public formLogin = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  public validarLogin(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    
    const usuario = this.formLogin.getRawValue();
    this.loginOutput.emit(usuario);
  }
}
