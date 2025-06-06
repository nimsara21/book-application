import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BookService, BooksGroupedByAuthor } from '../../services/book.service';
import { Book } from '../../models/book';
import { Chart, registerables } from 'chart.js';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';

// Register Chart.js components globally
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  latestBooks: Book[] = [];
  oldestBooks: Book[] = [];
  booksByAuthor: BooksGroupedByAuthor[] = [];
  chart: Chart | undefined;

  // Reference to the canvas element for Chart.js
@ViewChild('donutChart') private chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Fetch all data needed on init
    this.fetchLatestBooks();
    this.fetchOldestBooks();
    this.fetchBooksGroupedByAuthor();
  }

  ngAfterViewInit(): void {
    // Chart rendering moved to after data loads (inside fetchBooksGroupedByAuthor)
  }

  fetchLatestBooks(): void {
    this.bookService.getLatestBooks().subscribe({
      next: data => this.latestBooks = data,
      error: () => console.error('Failed to load latest books.')
    });
  }

  fetchOldestBooks(): void {
    this.bookService.getOldestBooks().subscribe({
      next: data => this.oldestBooks = data,
      error: () => console.error('Failed to load oldest books.')
    });
  }

fetchBooksGroupedByAuthor(): void {
  this.bookService.getBooksGroupedByAuthor().subscribe({
    next: data => {
      console.log('Books grouped by author:', data);  // Check data here
      this.booksByAuthor = data;
      this.renderDonutChart();
    },
    error: () => console.error('Failed to load books grouped by author.')
  });
}


  renderDonutChart(): void {
    if (!this.chartRef) {
      console.error('Chart canvas not found');
      return;
    }

    const labels = this.booksByAuthor.map(item => item.Author);
    const data = this.booksByAuthor.map(item => item.BookCount);

    // Destroy previous chart instance to avoid duplicates
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Books by Author',
          data: data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#E7E9ED', '#FFCD56', '#33D174', '#FF6699'
          ],
          borderColor: '#121212',  // matches your dark background better
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#e0e0e0' // light color for dark theme
            }
          },
          title: {
            display: true,
            text: 'Books by Author',
            color: '#e0e0e0'
          }
        }
      }
    });
  }
}
