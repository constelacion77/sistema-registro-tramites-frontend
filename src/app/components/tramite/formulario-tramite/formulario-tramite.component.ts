import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TramiteRequest } from '../../../classes/tramiteRequest';
import { NavegacionService } from '../../../services/navegacion/navegacion.service';
import { TramiteService } from '../../../services/tramite/tramite.service';
import { DocumentoService } from '../../../services/documento/documento.service';
import { BeneficiarioService } from '../../../services/beneficiario/beneficiario.service';
import { OffcanvasNuevoDocumentoComponent } from "../../documento/offcanvas-nuevo-documento/offcanvas-nuevo-documento.component";
import { OffcanvasNuevoBeneficiarioComponent } from "../../beneficiario/offcanvas-nuevo-beneficiario/offcanvas-nuevo-beneficiario.component";
import { OpcionSelect } from '../../../interfaces/opcion-select';

@Component({
  selector: 'formulario-tramite',
  imports: [FormsModule, ReactiveFormsModule, OffcanvasNuevoDocumentoComponent, OffcanvasNuevoBeneficiarioComponent],
  templateUrl: './formulario-tramite.component.html',
})
export class FormularioTramiteComponent {
  public tramite = input.required<TramiteRequest>();
  public tramiteOutput = output<TramiteRequest>();
  public navegacionService = inject(NavegacionService);
  public tramiteService = inject(TramiteService);
  public documentoService = inject(DocumentoService);
  public beneficiarioService = inject(BeneficiarioService);
  public opcionesDocumento = signal<OpcionSelect[]>([]);
  public opcionesBeneficiario = signal<OpcionSelect[]>([]);

  private fb = inject(NonNullableFormBuilder);

  public formTramite = this.fb.group({
    idDocumento: [0, [
      Validators.min(1)
    ]],
    idBeneficiario: [0, [
      Validators.min(1)
    ]],
    folio: ['', [
      Validators.maxLength(45)
    ]],
    honorarios: [0, []]
  });

  constructor() {
    effect(() => {
      this.formTramite.patchValue({
        idDocumento: this.tramite().idDocumento,
        idBeneficiario: this.tramite().idBeneficiario,
        folio: this.tramite().folio,
        honorarios: this.tramite().honorarios
      });
      this.obtenerOpcionesDocumento();
      this.obtenerOpcionesBeneficiario();
    })
  };

  public validarTramite(): void {
    if (this.formTramite.invalid) {
      this.formTramite.markAllAsTouched();
      return;
    }
    const tramite = {
      ...this.tramite(),
      ...this.formTramite.getRawValue()
    }
    
    this.guardarTramite(tramite);
  }

  public guardarTramite(tramite: TramiteRequest): void {
    this.tramiteOutput.emit(tramite);
  }

  public cancelar(): void {
    this.navegacionService.navegarATramites();
  }

  public actualizarDocumento(idDocumento:number):void{
    this.obtenerOpcionesDocumento();
    this.formTramite.patchValue({
      idDocumento:idDocumento
    });    
  }
  
  public actualizarBeneficiario(idBeneficiario:number):void{
    this.obtenerOpcionesBeneficiario();
    this.formTramite.patchValue({
      idBeneficiario:idBeneficiario
    });
  }
  
  public obtenerOpcionesDocumento():void{
    this.documentoService.obtenerOpcionesDocumento()
    .subscribe({
      next:(resp) =>{
        this.opcionesDocumento.set(resp);
      }
    });
  }
  
  public obtenerOpcionesBeneficiario():void{
    this.beneficiarioService.obtenerOpcionesBeneficiario()
    .subscribe({
      next:(resp) =>{
        this.opcionesBeneficiario.set(resp);
      }
    });
  }
}