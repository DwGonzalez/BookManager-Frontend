import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../../../domain/models/book.interface';
import { BookService } from '../../../../application/services/book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  public formBook = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pageCount: new FormControl(0, [Validators.required, Validators.min(1)]),
    excerpt: new FormControl('', Validators.required),
    publishDate: new FormControl('', [Validators.required]),
  });

  isEditing: boolean = false;
  bookDetails?: Book;
  idParam?: string;

  constructor(
    private _bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isEditing = params['action'] == 'edit';
      this.idParam = params['id'];
      if (!!this.idParam) {
        this.getBookDetails(params['id']);
        if (!this.isEditing) {
          this.formBook.disable();
        }
      }
    });
  }

  getBookDetails(id: number) {
    this._bookService.getBookById(id).subscribe(
      (b) => {
        this.bookDetails = b! as Book;
        var formatedDate = formatDate(
          this.bookDetails.publishDate!,
          'yyyy-MM-dd',
          'en'
        );
        this.formBook.patchValue({
          id: this.bookDetails.id,
          title: this.bookDetails.title,
          description: this.bookDetails.description,
          excerpt: this.bookDetails.excerpt,
          pageCount: this.bookDetails.pageCount,
          publishDate: formatedDate,
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  updateBook() {
    this._bookService.updateBook(this.bookDetails!).subscribe(
      (b) => {
        Swal.fire('', '', 'success');
        this.router.navigate(['books'], { replaceUrl: true });
      },
      (err) => {
        Swal.fire('There has been an error!', err.message, 'error');
      }
    );
  }
}
