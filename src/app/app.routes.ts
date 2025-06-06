import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { DashboardComponent } from './components/dashboard/component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/component').then(m => m.DashboardComponent)
  }
];
