import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAddressService {
  private autocomplete: google.maps.places.Autocomplete | undefined;

  public initializeAutocomplete(input: HTMLInputElement): void {
    console.log('the input', input);

    this.autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['address'],
      componentRestrictions: { country: 'de' },
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      console.log('place', place);
    });
  }
}
