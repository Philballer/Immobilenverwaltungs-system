import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-base-icon',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './base-icon.component.html',
  styleUrl: './base-icon.component.scss',
})
export class BaseIconComponent {
  @Input()
  public iconClass: string = '';

  @Input()
  public toolTip: string = '';

  @Input()
  public cursorPointer: boolean = true;

  @Output()
  public onClick = new EventEmitter<void>();

  public handleIconClick(): void {
    this.onClick.emit();
  }
}
