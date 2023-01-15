import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { DeleteConfirmationDialog } from './dialogs/delete-confirmation.dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    DeleteConfirmationDialog,
  ],
  exports: [
    DeleteConfirmationDialog,
  ]
})
export class CustomCommonModule {}