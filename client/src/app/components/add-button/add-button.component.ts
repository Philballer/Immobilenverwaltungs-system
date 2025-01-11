import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input()
  public buttonName: string = '';

  @Output()
  public buttonClick = new EventEmitter<void>();

  public handleButtonClicl(): void {
    this.buttonClick.emit();
  }
}
