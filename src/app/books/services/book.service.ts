import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../types/book.type';
import { environment } from '../../../environments/environment';

const BOOKS_ENDPOINT: string = '/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}${BOOKS_ENDPOINT}`);
  }

  createOne(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}${BOOKS_ENDPOINT}`, book);
  }

  modifyOne(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}${BOOKS_ENDPOINT}/${book._id}`, book);
  }

  deleteOne(book: Book): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${BOOKS_ENDPOINT}/${book._id}`);
  }
}
