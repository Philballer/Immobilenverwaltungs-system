import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoogleAddressService } from '../../services/google-address/google-address.service';

@Component({
  selector: 'app-google-autcomplete-address-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './google-autcomplete-address-searchbar.component.html',
  styleUrl: './google-autcomplete-address-searchbar.component.scss',
})
export class GoogleAutcompleteAddressSearchbarComponent
  implements AfterViewInit, OnInit
{
  @ViewChild('searchInput')
  public searchInput!: ElementRef;

  @Output()
  public onAddressChange = new EventEmitter<string>();

  constructor(private _googleService: GoogleAddressService) {}

  ngOnInit(): void {
    this._googleService.address.subscribe((data: string) => {
      this.onAddressChange.emit(data);
    });
  }

  public ngAfterViewInit(): void {
    this._googleService.initializeAutocomplete(this.searchInput.nativeElement);
  }
}
