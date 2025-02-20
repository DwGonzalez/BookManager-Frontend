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
];
