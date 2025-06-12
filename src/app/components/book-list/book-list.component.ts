import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,   
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  error = '';

  displayedColumns: string[] = ['title', 'author', 'isbn', 'publishedDate', 'actions'];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: data => this.books = data,
      error: () => this.error = 'No Books Added'
    });
  }

  deleteBook(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: () => alert('Delete failed')
      });
    }
  }

  editBook(id?: number): void {
    this.router.navigate(['/edit', id]);
  }

  addBook(): void {
    this.router.navigate(['/add']);
  }
}