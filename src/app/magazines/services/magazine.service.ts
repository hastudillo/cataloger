import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Magazine } from '../../types/magazine.type';
import { environment } from '../../../environments/environment';

const MAGAZINES_ENDPOINT: string = '/magazines';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Magazine[]> {
    return this.http.get<Magazine[]>(`${environment.apiUrl}${MAGAZINES_ENDPOINT}`);
  }

  createOne(magazine: Magazine): Observable<Magazine> {
    return this.http.post<Magazine>(`${environment.apiUrl}${MAGAZINES_ENDPOINT}`, magazine);
  }

  modifyOne(magazine: Magazine): Observable<Magazine> {
    return this.http.put<Magazine>(`${environment.apiUrl}${MAGAZINES_ENDPOINT}/${magazine._id}`, magazine);
  }

  deleteOne(magazine: Magazine): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${MAGAZINES_ENDPOINT}/${magazine._id}`);
  }
}
