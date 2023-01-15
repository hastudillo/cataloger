import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';

import { BookDetailDialog } from './dialogs/book-detail.dialog';
import { DeleteConfirmationDialog } from '../common/dialogs/delete-confirmation.dialog';
import { BookService } from './services/book.service';
import { Book } from './types/book.type';

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  displayedColumns: string[] = ['author', 'title', 'city', 'publisher', 'date', 'actions'];
  dataSource$: CdkTableDataSourceInput<Book> = of([]);

  constructor(
    public readonly dialog: MatDialog,
    public readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource(): void {
    this.dataSource$ = this.bookService.getAll().pipe(
      map((books: Book[]) => {
        const matTableDataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
        return (matTableDataSource.data = books);
      })
    );
  }

  openDeleteDialog(element: Book): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);
    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.bookService.deleteOne(element).subscribe(() =>
          this.getDataSource()
        );
      }
    });
  }

  openBookDetailDialog(element?: Book): void {
    const dialogRef = this.dialog.open(BookDetailDialog, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result: Book | undefined) => {
      if (result) {
        if (element) {
          this.bookService.modifyOne(result).subscribe(() =>
          this.getDataSource());
          return;
        }
        this.bookService.createOne(result).subscribe(() =>
          this.getDataSource()
        );
      }
    });
  }
}
