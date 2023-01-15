import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Magazine } from "src/app/types/magazine.type";

const HYPHEN: string = '-';

// ? https://en.wikipedia.org/wiki/International_Standard_Serial_Number
const ISSN_REGEXP: RegExp = new RegExp(/^[0-9]{4}-[0-9]{3}[0-9X]$/, 'i');
const ISSN_REGEXP_WITHOUT_HYPHEN: RegExp = new RegExp(/^[0-9]{7}[0-9X]$/, 'i');

const ISSN_RECOMMENDED: string = 'It is recommended to indicate an ISSN';
const NON_VALID_ISSN: string = 'The indicated ISSN is not valid';
const HYPHENATION_RECOMMENDED: string = 'It is recommended to write the ISSN with hyphen';

@Component({
  selector: 'magazine-detail.dialog',
  templateUrl: 'magazine-detail.dialog.html',
  styleUrls: ['./magazine-detail.dialog.scss']
})
export class MagazineDetailDialog implements OnInit {
  issnWarning: string = '';
  nonValidIssn: string = NON_VALID_ISSN;

  constructor(
    public dialogRef: MatDialogRef<MagazineDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data?: Magazine,
  ) {}

  ngOnInit(): void {
    this.initializeDataWhenNewMagazine();
  }

  private initializeDataWhenNewMagazine() {
    if (!this.data) {
      this.data = {
        editors: '',
        name: '',
      };
      this.issnWarning = ISSN_RECOMMENDED;
    }
  }

  verifyIssn(issn: string | undefined): void {
    if (!issn) {
      this.issnWarning = ISSN_RECOMMENDED;
      return;
    }
    const issnWithoutHyphens: string = issn.replaceAll(HYPHEN, '');
    if (issnWithoutHyphens.match(ISSN_REGEXP_WITHOUT_HYPHEN)) {
      if (!this.isValidIssn(issnWithoutHyphens)) {
        this.issnWarning = NON_VALID_ISSN;
      } else {
        this.issnWarning = '';
        if (!issn.match(ISSN_REGEXP)) {
          this.issnWarning = HYPHENATION_RECOMMENDED;
        }
      }
    } else {
      this.issnWarning = NON_VALID_ISSN;
    }
    return;
  }

  private isValidIssn(issn: string): boolean {
    let sum: number = 0;
    for (let index: number = 0; index < 8 - 1; index++) {
      if (isNaN(parseInt(issn[index]))) {
        return false;
      }
      sum += parseInt(issn[index]) * (8 - index);
    }
    const check: number = (sum % 11) === 0 ? 0 : 11 - (sum % 11);
    const checkString: string = issn[8 - 1];
    return this.getCheckNumber(checkString) === check;
  }

  private getCheckNumber(checkString: string): number {
    if ('X' === checkString.toUpperCase()) {
      return 10;
    } else if (!isNaN(parseInt(checkString))) {
      return parseInt(checkString);
    } else {
      return NaN;
    }
  }
}
