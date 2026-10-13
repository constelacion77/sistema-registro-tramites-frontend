import { Component, input } from '@angular/core';

@Component({
  selector: 'card-message',
  imports: [],
  templateUrl: './card-message.component.html'
})
export class CardMessageComponent {
  // private messageService = inject(MessageService);
  // public message = computed(() => this.messageService.message());

  public title = input.required<string>();
  public message = input.required<string>();
}
