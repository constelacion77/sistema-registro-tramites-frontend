import { Component, computed, inject } from '@angular/core';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'toast',
  imports: [NgClass],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  public notificacionService = inject(NotificacionService);

  public notificacion = computed(() => this.notificacionService.notificacion());
}
