import { Injectable, signal } from '@angular/core';
import { Notificacion } from '../../models/notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  public notificacion = signal<Notificacion | null>(null);

  public show(
    title:string,
    message:string,
    type:Notificacion['type']
  ):void{
    this.notificacion.set({
      title,
      message,
      type,
      visible: true
    });

    setTimeout(() =>{
      this.close();
    }, 5000)
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

  public close():void{
    this.notificacion.update(n => n?{
      ...n,
      visible: false
    }: null);
  }
}
