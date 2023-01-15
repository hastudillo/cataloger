import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Book } from "../types/book.type";

const HYPHEN: string = '-';

// ? https://regexlib.com/Search.aspx?k=ISBN
// ? https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html
const ISBN_10_REGEXP: RegExp = new RegExp(/^\d{9}[\d|X]$/, 'i');
const ISBN_13_REGEXP: RegExp = new RegExp(/^97(8|9)\d{9}[\d|X]$/, 'i');

const ISBN_RECOMMENDED: string = 'It is recommended to indicate an ISBN';
const NON_VALID_ISBN: string = 'The indicated ISBN is not valid';
const HYPHENATION_RECOMMENDED: string = 'It is recommended to write the ISBN with hyphens';
const ISBN_13_RECOMMENDED: string = 'It is recommended to write an 13 digits ISBN';

@Component({
  selector: 'book-detail.dialog',
  templateUrl: 'book-detail.dialog.html',
  styleUrls: ['./book-detail.dialog.scss']
})
export class BookDetailDialog implements OnInit {
  isbnWarning: string = '';
  nonValidIsbn: string = NON_VALID_ISBN;

  constructor(
    public dialogRef: MatDialogRef<BookDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data?: Book,
  ) {}

  ngOnInit(): void {
    this.initializeDataWhenNewBook();
  }

  private initializeDataWhenNewBook() {
    if (!this.data) {
      this.data = {
        author: '',
        title: '',
        publisher: '',
        date: 1970,
      };
      this.isbnWarning = ISBN_RECOMMENDED;
    }
  }

  verifyIsbn(isbn: string | undefined): void {
    if (!isbn) {
      this.isbnWarning = ISBN_RECOMMENDED;
      return;
    }
    const isbnWithoutHyphens: string = isbn.replaceAll(HYPHEN, '');
    if (isbnWithoutHyphens.match(ISBN_10_REGEXP)) {
      if (isbn.includes(HYPHEN)) {
        this.isbnWarning = ISBN_13_RECOMMENDED;
      }
      if (!this.isValidIsbn10(isbnWithoutHyphens)) {
        this.isbnWarning = NON_VALID_ISBN;
      }
      return;
    } else if (isbnWithoutHyphens.match(ISBN_13_REGEXP)) {
      if (!this.isValidIsbn13(isbnWithoutHyphens)) {
        this.isbnWarning = NON_VALID_ISBN;
        return;
      }
      if (isbn.includes(HYPHEN)) {
        this.isbnWarning = '';
        if (!isbn.includes(HYPHEN)) {
          this.isbnWarning = HYPHENATION_RECOMMENDED;
        }
      }
      return;
    } else {
      this.isbnWarning = NON_VALID_ISBN;
      return;
    }
  }

  // ? https://www.instructables.com/How-to-verify-a-ISBN/
  // ? https://itecnote.com/tecnote/php-regex-differentiating-between-isbn-10-and-isbn-13/

  private isValidIsbn10(isbnWithoutHyphens: string): boolean {
    let check: number = 0;
    for (let index: number = 0; index < 10; index++) {
      if ('X' === isbnWithoutHyphens[index].toUpperCase()) {
        check += 10 * (10 - index);
      } else if (!isNaN(parseInt(isbnWithoutHyphens[index]))) {
        check += parseInt(isbnWithoutHyphens[index]) * (10 - index);
      } else {
        return false;
      }
    }
    return (check % 11) === 0;
  }

  private isValidIsbn13(isbnWithoutHyphens: string): boolean {
    let check: number = 0;
    for (let index: number = 0; index < 13; index += 2) {
      if (isNaN(parseInt(isbnWithoutHyphens[index]))) {
        return false;
      }
      check += parseInt(isbnWithoutHyphens[index]);
    }
    for (let index: number = 1; index < 12; index += 2) {
      if (isNaN(parseInt(isbnWithoutHyphens[index]))) {
        return false;
      }
      check += 3 * parseInt(isbnWithoutHyphens[index]);
    }
    return (check % 10) === 0;
  }
}