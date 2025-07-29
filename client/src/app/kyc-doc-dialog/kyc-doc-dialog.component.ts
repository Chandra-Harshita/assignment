import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kyc-doc-dialog',
  templateUrl: './kyc-doc-dialog.component.html',
  styleUrls: ['./kyc-doc-dialog.component.css'] // note: 'styleUrls', not 'styleUrl'
})
export class KycDocDialogComponent {

  documentType = new FormControl('', Validators.required);
  fileTypes: string[] = ['Adhaar card', 'PAN card', 'Voter ID', 'Passport'];
  kycFile: File | null = null;
  selectedFile: File | null = null;
  showFileError = false;

  constructor(
    public dialogRef: MatDialogRef<KycDocDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.showFileError = false;
    }
  }

  onUpload(): void {
    if (this.documentType.invalid || !this.selectedFile) {
      this.documentType.markAsTouched();
      this.showFileError = true;
      return;
    }

    
    const uploadData = {
      type: this.documentType.value,
      file: this.selectedFile
    };

    
    this.dialogRef.close(uploadData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
