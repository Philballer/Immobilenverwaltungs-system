import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input()
  public buttonName: string = '';

  @Input()
  public isNormal? = false;

  @Output()
  public buttonClick = new EventEmitter<void>();

  public handleButtonClicl(): void {
    this.buttonClick.emit();
  }
}
