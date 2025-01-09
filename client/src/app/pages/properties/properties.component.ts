import { Component } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [AddButtonComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {}
