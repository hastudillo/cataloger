import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './books/book.component';
import { MagazineComponent } from './magazines/magazine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component:  BookComponent
  },
  {
    path: 'magazines',
    component:  MagazineComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
