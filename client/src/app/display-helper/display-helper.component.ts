import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HelpersdetailsService } from '../helpersdetails.service';
import { Helper } from '../helpers.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycDocDialogComponent } from '../kyc-doc-dialog/kyc-doc-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-helper',
  templateUrl: './display-helper.component.html',
  styleUrls: ['./display-helper.component.css']
})
export class DisplayHelperComponent implements OnChanges {
  helper: Partial<Helper> = {};
  dialogRef!: MatDialogRef<KycDocDialogComponent>;

  private _helperid: string = '';
  private _helper: Partial<Helper> = {};

  @Input() showActions: boolean = true;

  @Input()
  set helperid(value: string) {
    if (value) {
      this._helperid = value;
      this.fetchHelperData(value);
    }
  }

  @Input()
  set helperData(data: Partial<Helper>) {
    if (data && Object.keys(data).length) {
      this._helper = data;
      this.helper = data;
    }
  }

  @Output() userDeleted = new EventEmitter<void>();

  constructor(
    private userdatailsservice: HelpersdetailsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['helperid'] && this._helperid) {
      this.fetchHelperData(this._helperid);
    }
  }

  fetchHelperData(id: string): void {
    this.userdatailsservice.getSingleHelperData(id).subscribe(
      response => {
        if (response.success) {
          this.helper = response.data as Partial<Helper>;
        } else {
          console.error('API returned failure');
        }
      },
      error => {
        console.error('Failed to load helper data', error);
      }
    );
  }

  onDeleteHelper(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userdatailsservice.deleteHelperData(this._helperid).subscribe({
          next: (res) => {
            this.userDeleted.emit(); 
            this.showSuccessSnackbar(); 
          },
          error: (err) => {
            console.error('Error deleting:', err);
          }
        });
      }
    });
  }

  showSuccessSnackbar(): void {
    this.snackBar.open('User deleted successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }
}
