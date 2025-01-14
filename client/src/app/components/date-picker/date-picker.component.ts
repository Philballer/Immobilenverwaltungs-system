import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

export type IDateRange = { startDate: string; endDate: string };

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, FormsModule, CommonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  public dateRange: IDateRange = {} as IDateRange;

  @Input()
  public disable: boolean = false;

  @Output()
  public dateRangeChange = new EventEmitter<IDateRange>();

  public handleDateChange(): void {
    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.dateRangeChange.emit(this.dateRange);
    }
  }
}
