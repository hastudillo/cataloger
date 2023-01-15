import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { BookComponent } from './book.component';
import { BookDetailDialog } from './dialogs/book-detail.dialog';
import { CustomCommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CustomCommonModule,
  ],
  declarations: [
    BookComponent,
    BookDetailDialog
  ]
})
export class BookModule {}