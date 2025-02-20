import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Author } from '../../../../domain/models/author.interface';
import { AuthorService } from '../../../../application/services/author.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-list',
  imports: [
    NgIf,
    NgFor,
    NgxPaginationModule,
    FormsModule,
    FilterPipeModule,
    RouterLink,
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  actualPage: number = 1;
  authorList: Author[] = [];
  loading: boolean = false;
  authorFilter: any = { id: '' };

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];

  constructor(private _authorService: AuthorService) {}

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.loading = true;
    this._authorService.getAllAuthors().subscribe((data) => {
      this.authorList = data;
      this.loading = false;
    });
  }

  deleteAuthor(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._authorService.deleteAuthor(id).subscribe(
          (b) => {
            Swal.fire('Deleted!', '', 'success');
            this.getAllAuthors();
          },
          (err) => {
            Swal.fire('There has been an error!', err.message, 'error');
          }
        );
      }
    });
  }
}
