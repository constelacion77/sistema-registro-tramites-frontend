import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { LogoutButtonComponent } from "../../components/logout/logout-button.component";

@Component({
  selector: 'app-dashboard.component',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoadingSpinnerComponent, LogoutButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  
}
