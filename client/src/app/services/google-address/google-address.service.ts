import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleAddressService {
  private URL = `https://maps.googleapis.com/maps/api/js?key=${process.env['API_KEY']}&libraries=places`;

  constructor(private http: HttpClient) {}
}
