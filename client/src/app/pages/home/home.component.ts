import { Component } from '@angular/core';
import { PropertiesComponent } from '../properties/properties.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PropertiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
