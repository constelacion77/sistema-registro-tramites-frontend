import { Component, input, output } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  public titulo = input.required<string>();
  public mensaje = input.required<string>();
  public confirmation = output<void>();

  public aceptar():void{
    this.confirmation.emit();
  }
}
