import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './error-message-form.component.html',
  styleUrl: './error-message-form.component.scss',
})
export class ErrorMessageFormComponent implements OnInit {
  @ViewChild('input')
  public input!: ElementRef<HTMLInputElement>;

  @Input()
  public options: string[] = [];

  @Input()
  public label: string = 'Default Label';

  @Input()
  public placeholder: string = '';

  @Input()
  public show: boolean = false;

  @Input()
  public width: number = 100;

  @Output()
  public onInputSelect = new EventEmitter<string>();

  public inputControl = new FormControl('');

  public filteredOptions: string[] = [];

  public subscription: Subscription | undefined;

  public showErrorMessage: boolean = false;

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  public ngOnInit(): void {
    this.subscription = this.inputControl.valueChanges.subscribe((value) => {
      if (value) this.onInputSelect.emit(value);
    });
  }

  public filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
