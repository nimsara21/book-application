import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class BookFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    isbn: ['', Validators.required],
    publicationDate: ['', Validators.required]
  });

  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = +id;
      this.bookService.getBook(this.bookId).subscribe(book => {
        this.form.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: book.publishedDate
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const book: Book = {
      title: this.form.value.title!,
      author: this.form.value.author!,
      isbn: this.form.value.isbn!,
      publishedDate: this.form.value.publicationDate!
    };

    if (this.bookId) {
      this.bookService.updateBook(this.bookId, book).subscribe(() => {
        this.snackBar.open('Book updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.snackBar.open('Book added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
