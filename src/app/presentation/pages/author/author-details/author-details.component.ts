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
import { AuthorService } from '../../../../application/services/author.service';
import { Author } from '../../../../domain/models/author.interface';

@Component({
  selector: 'app-author-details',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css',
})
export class AuthorDetailsComponent {
  public formBook = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pageCount: new FormControl(0, [Validators.required, Validators.min(1)]),
    excerpt: new FormControl('', Validators.required),
    publishDate: new FormControl('', [Validators.required]),
  });
  public formAuthor = new FormGroup({
    id: new FormControl(0),
    bookId: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  isEditing: boolean = false;
  authorDetails?: Author;
  idParam?: string;

  constructor(
    private _authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isEditing = params['action'] == 'edit';
      this.idParam = params['id'];
      if (!!this.idParam) {
        this.getAuthorDetails(params['id']);
        if (!this.isEditing) {
          this.formBook.disable();
        }
      }
    });
  }

  getAuthorDetails(id: number) {
    this._authorService.getAuthorById(id).subscribe(
      (b) => {
        this.authorDetails = b! as Author;
        this.formAuthor.patchValue({
          id: this.authorDetails.id,
          firstName: this.authorDetails.firstName,
          lastName: this.authorDetails.lastName,
          bookId: this.authorDetails.bookId,
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  updateAuthor() {
    this._authorService.updateAuthor(this.authorDetails!).subscribe(
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
