import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAddressService {
  private autocomplete: google.maps.places.Autocomplete | undefined;

  public address = new EventEmitter<string>();

  public initializeAutocomplete(input: HTMLInputElement): void {
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['address'],
      componentRestrictions: { country: 'de' },
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      this.address.emit(place?.formatted_address);
    });
  }
}
