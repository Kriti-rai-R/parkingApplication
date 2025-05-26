import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkingTicketToolComponent } from './parking-ticket-tool/parking-ticket-tool.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ParkingTicketToolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parking';
}
