import { Injectable, signal } from '@angular/core';
import { Notificacion } from '../../models/notificacion';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public message = signal<Notificacion | null>(null);

  public show(
    title: string,
    message: string,
    type: Notificacion['type']
  ):void{
    this.message.set({
      title,
      message,
      type,
      visible: true
    });
  }

  public success(message:string):void{
    this.show('Éxito', message, 'success');
  }

  public danger(message:string):void{
    this.show('Error', message, 'danger');
  }

  public warning(message:string):void{
    this.show('Advertencia', message, 'warning');
  }

  public info(message:string):void{
    this.show('Informacion', message, 'info');
  }
}
