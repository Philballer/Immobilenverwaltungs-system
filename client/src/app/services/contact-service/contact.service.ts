import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IContact } from '../../types/main-types';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private server_URL = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) {}

  public getAllProperties(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.server_URL);
  }

  public getOneProperty(id: string): Observable<IContact> {
    return this.http.get<IContact>(`${this.server_URL}/${id}`);
  }

  public deleteOneProperty(userId: string): Observable<IContact> {
    return this.http.delete<IContact>(`${this.server_URL}/${userId}`);
  }

  public createProperty(property: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.server_URL, property);
  }

  public updateProperty(property: IContact, id: string): Observable<IContact> {
    const put_URL = `${this.server_URL}/${id}`;
    return this.http.put<IContact>(put_URL, property);
  }
}
