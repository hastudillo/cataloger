import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'delete-confirmation.dialog',
  templateUrl: 'delete-confirmation.dialog.html',
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
  ) {}
}