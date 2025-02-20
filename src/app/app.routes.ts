import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadComponent: () =>
      import('./presentation/pages/book/book-list/book-list.component').then(
        (c) => c.BookListComponent
      ),
  },
  {
    path: 'books/:id/:action',
    loadComponent: () =>
      import(
        './presentation/pages/book/book-details/book-details.component'
      ).then((c) => c.BookDetailsComponent),
  },
  {
    path: 'books/add',
    loadComponent: () =>
      import(
        './presentation/pages/book/book-add-edit-create/book-add-edit-create.component'
      ).then((c) => c.BookAddEditCreateComponent),
  },
  {
    path: 'authors',
    loadComponent: () =>
      import(
        './presentation/pages/author/author-list/author-list.component'
      ).then((c) => c.AuthorListComponent),
  },
];
