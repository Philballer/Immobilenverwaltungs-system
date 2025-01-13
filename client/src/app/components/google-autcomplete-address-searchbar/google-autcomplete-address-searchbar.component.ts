import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

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
  implements AfterViewInit
{
  @ViewChild('searchInput')
  public searchInput!: ElementRef;

  public searchValue: string = '';

  constructor(private _googleService: GoogleAddressService) {}

  public ngAfterViewInit(): void {
    this._googleService.initializeAutocomplete(this.searchInput.nativeElement);
  }

  public onSearchValueChange(value: string): void {
    // console.log(value);
  }
}
