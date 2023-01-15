import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MaterialModule } from '../material.module';
import { MagazineComponent } from './magazine.component';
import { MagazineDetailDialog } from './dialogs/magazine-detail.dialog';
import { CustomCommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CustomCommonModule,
  ],
  declarations: [
    MagazineComponent,
    MagazineDetailDialog
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class MagazineModule {}