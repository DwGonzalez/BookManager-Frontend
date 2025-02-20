import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly _apiUrl = 'https://localhost:7208/api/authors';

  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this._apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this._apiUrl}/${id}`);
  }

  getAuthorsByBookId(bookId: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${this._apiUrl}/book/${bookId}`);
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this._apiUrl, author);
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this._apiUrl}/${author.id}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${id}`);
  }
}
