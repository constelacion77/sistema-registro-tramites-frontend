import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'loading-spinner',
  imports: [AsyncPipe],
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
  public loadingService = inject(LoadingService);
}
