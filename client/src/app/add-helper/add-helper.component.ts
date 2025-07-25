import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycDocDialogComponent } from '../kyc-doc-dialog/kyc-doc-dialog.component';

@Component({
  selector: 'app-add-helper',
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.css'
})
export class AddHelperComponent {
  name = new FormControl('');
  languagesSelected = new FormControl([])
  service = new FormControl('')
  organization = new FormControl('')
  gender = new FormControl('')
  phone = new FormControl()
  email = new FormControl('')
  vehicle = new FormControl('')
  vehicleNumber = new FormControl('')
 dialogRef!: MatDialogRef<KycDocDialogComponent>
 
  services: string[] = ['maid', 'cook', 'nurse', 'driver', 'plumber', 'newspaper', 'laundry']
  organizations: string[] = ['ASBL', 'Springs Helpers']
  languages: string[] = ['telugu', 'english', 'hindi', 'tamil', 'malayalam', 'bengali', 'all']
  vehicleTypes: string[] = ['none', 'car', 'bike', 'auto']

  constructor(public dialog: MatDialog) {}


  openDialog(): void {
     this.dialogRef = this.dialog.open(KycDocDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
  closeDialog():void {
    console.log(this.dialogRef)
    this.dialogRef.close();
  }
  
}
