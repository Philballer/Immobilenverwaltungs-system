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
import { ContractType } from '../../types/main-types';

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dropdown-select.component.html',
  styleUrl: './dropdown-select.component.scss',
})
export class DropdownSelectComponent implements OnInit, OnDestroy {
  @ViewChild('input')
  public input!: ElementRef<HTMLInputElement>;

  @Input()
  public options: string[] = [];

  @Input()
  public label: string = 'Default Label';

  @Input()
  public placeholder: string = '';

  @Input()
  public width: number = 100;

  @Input()
  public isRole: boolean = false;

  @Output()
  public onInputSelect = new EventEmitter<number>();

  @Output()
  public roleSelected = new EventEmitter<{ name: string; value: boolean }>();

  public inputControl = new FormControl('');

  public filteredOptions: string[] = [];

  public subscription: Subscription | undefined;

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  public ngOnInit(): void {
    this.subscription = this.inputControl.valueChanges.subscribe((value) => {
      if (this.isRole) {
        if (value === ContractType.SERVICE) {
          this.roleSelected.emit({ name: value, value: true });
          return;
        }

        this.roleSelected.emit({ name: value || '', value: false });
        return;
      }

      if (value) this.onInputSelect.emit(this.options.indexOf(value));
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
