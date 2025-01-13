import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IProperty } from '../../types/main-types';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private server_URL = 'http://localhost:3000/properties';

  constructor(private http: HttpClient) {}

  public getAllProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(this.server_URL);
  }

  public getOneProperty(id: string): Observable<IProperty> {
    return this.http.get<IProperty>(`${this.server_URL}/${id}`);
  }

  public deleteOneProperty(userId: string): Observable<IProperty> {
    return this.http.delete<IProperty>(`${this.server_URL}/${userId}`);
  }

  public createProperty(property: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(this.server_URL, property);
  }

  public updateProperty(
    property: IProperty,
    id: string
  ): Observable<IProperty> {
    const put_URL = `${this.server_URL}/${id}`;
    return this.http.put<IProperty>(put_URL, property);
  }
}
