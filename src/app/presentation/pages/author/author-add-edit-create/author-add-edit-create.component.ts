import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Author } from '../../../../domain/models/author.interface';
import { AuthorService } from '../../../../application/services/author.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-add-edit-create',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './author-add-edit-create.component.html',
  styleUrl: './author-add-edit-create.component.css',
})
export class AuthorAddEditCreateComponent {
  public formAuthor = new FormGroup({
    id: new FormControl(0),
    bookId: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  authorDetails!: Author[];
  idParam!: string;

  constructor(private _authorService: AuthorService, private router: Router) {}

  ngOnInit(): void {}

  addAuthor() {
    const author: Author = this.formAuthor.value as Author;
    this._authorService.addAuthor(author).subscribe((b) => {
      if (b) {
        Swal.fire('Saved!', '', 'success');
        this.router.navigate(['authors'], { replaceUrl: true });
      }
    });
  }
}
