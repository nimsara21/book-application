// src/app/services/book.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
}

// Optional DTO for grouped books
export interface BooksGroupedByAuthor {
  author: string;
  bookCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://localhost:7271/api/books';   

  constructor(private http: HttpClient) {}

  // Existing methods
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // New methods
  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/latest`);
  }

  getOldestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/oldest`);
  }

  getBooksGroupedByAuthor(): Observable<BooksGroupedByAuthor[]> {
    return this.http.get<BooksGroupedByAuthor[]>(`${this.apiUrl}/group-by-author`);
  }
}