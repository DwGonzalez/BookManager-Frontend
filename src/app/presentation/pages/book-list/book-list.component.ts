import { Component } from '@angular/core';
import { Book } from '../../../domain/models/book.interface';
import { BookService } from '../../../application/services/book.service';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [NgIf, NgFor, SlicePipe, DatePipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  actualPage: number = 1;
  bookList: Book[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'pageCount',
    'excerpt',
    'publishDate',
    'actions',
  ];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.loading = true;
    this.bookService.getAllBooks().subscribe((data) => {
      this.bookList = data;
      this.loading = false;
    });
  }
}
