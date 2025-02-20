import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../../../domain/models/book.interface';
import { BookService } from '../../../../application/services/book.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-add-edit-create',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './book-add-edit-create.component.html',
  styleUrl: './book-add-edit-create.component.css',
})
export class BookAddEditCreateComponent {
  public formBook = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pageCount: new FormControl('', Validators.required),
    excerpt: new FormControl('', Validators.required),
    publishDate: new FormControl('', Validators.required),
  });

  bookDetails!: Book[];
  idParam!: string;

  constructor(private _bookService: BookService, private router: Router) {}

  ngOnInit(): void {}

  addBook() {
    const book: Book = this.formBook.value as Book;
    this._bookService.addBook(book).subscribe((b) => {
      if (b) {
        Swal.fire('Saved!', 'success');
        this.router.navigate(['books'], { replaceUrl: true });
      }
    });
  }
}
