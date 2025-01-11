import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProperty } from '../../types/main-types';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private base_URL = 'http://localhost:3000/properties';

  constructor(private http: HttpClient) {}

  public getAllProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(this.base_URL);
  }
}
