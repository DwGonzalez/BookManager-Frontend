import { Component } from '@angular/core';
import { Book } from '../../../../domain/models/book.interface';
import { BookService } from '../../../../application/services/book.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  imports: [
    NgIf,
    NgFor,
    SlicePipe,
    NgxPaginationModule,
    FormsModule,
    FilterPipeModule,
    RouterLink,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  actualPage: number = 1;
  bookList: Book[] = [];
  loading: boolean = false;
  bookFilter: any = { id: '' };

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.loading = true;
    this._bookService.getAllBooks().subscribe((data) => {
      this.bookList = data;
      this.loading = false;
    });
  }

  deleteBook(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._bookService.deleteBook(id).subscribe(
          (b) => {
            Swal.fire('Deleted!', '', 'success');
            this.getAllBooks();
          },
          (err) => {
            Swal.fire('There has been an error!', err.message, 'error');
          }
        );
      }
    });
  }
}
