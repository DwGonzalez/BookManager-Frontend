import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _apiUrl = 'https://localhost:7208/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this._apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this._apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this._apiUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this._apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${id}`);
  }
}
