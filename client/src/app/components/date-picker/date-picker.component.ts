import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
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
export class DatePickerComponent implements OnChanges {
  public dateRange: IDateRange = {} as IDateRange;

  @Input()
  public disable: boolean = false;

  @Input()
  public showError: boolean = false;

  @Input()
  public reset: boolean = false;

  @Output()
  public dateRangeChange = new EventEmitter<IDateRange>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue) {
      this.dateRange.startDate = '';
      this.dateRange.endDate = '';
    }
  }

  public handleDateChange(): void {
    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.dateRangeChange.emit(this.dateRange);
    }
  }
}
