import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';

import { DeleteConfirmationDialog } from '../common/dialogs/delete-confirmation.dialog';
import { Magazine } from '../types/magazine.type';
import { MagazineDetailDialog } from './dialogs/magazine-detail.dialog';
import { MagazineService } from './services/magazine.service';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export class MagazineComponent implements OnInit {
  displayedColumns: string[] = ['editors', 'name', 'volume', 'issue', 'date', 'actions'];
  dataSource$: CdkTableDataSourceInput<Magazine> = of([]);

  constructor(
    public readonly dialog: MatDialog,
    public readonly magazineService: MagazineService
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource(): void {
    this.dataSource$ = this.magazineService.getAll().pipe(
      map((magazines: Magazine[]) => {
        const matTableDataSource: MatTableDataSource<Magazine> = new MatTableDataSource<Magazine>([]);
        return (matTableDataSource.data = magazines);
      })
    );
  }

  openDeleteDialog(element: Magazine): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);
    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.magazineService.deleteOne(element).subscribe(() =>
          this.getDataSource()
        );
      }
    });
  }

  openMagazineDetailDialog(element?: Magazine): void {
    const dialogRef = this.dialog.open(MagazineDetailDialog, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result: Magazine | undefined) => {
      if (result) {
        if (element) {
          this.magazineService.modifyOne(result).subscribe(() =>
          this.getDataSource());
          return;
        }
        this.magazineService.createOne(result).subscribe(() =>
          this.getDataSource()
        );
      }
    });
  }
}
