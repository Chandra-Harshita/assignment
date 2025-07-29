import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycDocDialogComponent } from '../kyc-doc-dialog/kyc-doc-dialog.component';
import { Router } from '@angular/router';
import { Helper } from '../helpers.model';
import { HelpersdetailsService } from '../helpersdetails.service';

@Component({
  selector: 'app-add-helper',
  templateUrl: './add-helper.component.html',
  styleUrls: ['./add-helper.component.css']
})
export class AddHelperComponent {

  step: number = 1;

  name = new FormControl('', Validators.required);
  languagesSelected = new FormControl([], Validators.required);
  service = new FormControl('', Validators.required);
  organization = new FormControl('', Validators.required);
  gender = new FormControl('', Validators.required);
  phone = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  email = new FormControl('', Validators.email); // Optional
  vehicle = new FormControl('', Validators.required);
  vehicleNumber = new FormControl('', Validators.required);
  fileType: string = ''
  file!: File
  photoFile: File | null = null;

  dialogRef?: MatDialogRef<KycDocDialogComponent, any>;

  services: string[] = ['maid', 'cook', 'nurse', 'driver', 'plumber', 'newspaper', 'laundry'];
  organizations: string[] = ['ASBL', 'Springs Helpers'];
  languages: string[] = ['telugu', 'english', 'hindi', 'tamil', 'malayalam', 'bengali', 'all'];
  vehicleTypes: string[] = ['none', 'car', 'bike', 'auto'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userdatailsservice: HelpersdetailsService
  ) { }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
    }
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(KycDocDialogComponent, {
      height: '400px',
      width: '600px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Received from dialog:', result);
        this.fileType = result.type
        this.file = result.file
      }
    });
  }

  onClickingNext(): void {
    if (this.step === 1) {
      if (this.isStepOneValid()) {
        this.step = 2;
      } else {
        this.markAllStepOneControlsTouched();
      }
    } else if (this.step === 2) {
      this.step = 3;
    }
  }

  onClickPrevious(): void {
    if (this.step > 1) this.step--;
  }

  goTohome(): void {
    this.router.navigate(['/']);
  }

  // Validation check for Step 1
  private isStepOneValid(): boolean {
    const vehicleCheck = this.vehicle.value === 'none' || this.vehicleNumber.valid;
    return this.name.valid &&
      this.phone.valid &&
      this.gender.valid &&
      this.service.valid &&
      this.organization.valid &&
      this.languagesSelected.valid &&
      this.vehicle.valid &&
      vehicleCheck;
  }

  // Touch all controls to show validation errors
  private markAllStepOneControlsTouched(): void {
    this.name.markAsTouched();
    this.phone.markAsTouched();
    this.gender.markAsTouched();
    this.service.markAsTouched();
    this.organization.markAsTouched();
    this.languagesSelected.markAsTouched();
    this.vehicle.markAsTouched();
    if (this.vehicle.value !== 'none') {
      this.vehicleNumber.markAsTouched();
    }
  }

  get previewHelper(): Partial<Helper> {
    return {
      name: this.name.value ?? '',
      phone: this.phone.value ? Number(this.phone.value) : undefined,
      gender: this.gender.value ?? '',
      email: this.email.value ?? undefined,
      typeOfService: this.service.value ?? '',
      organization: this.organization.value ?? '',
      languages: this.languagesSelected.value ?? [],
      fileType: this.fileType,
      KYCDocument: this.file,
      vehicleType: this.vehicle.value ?? undefined,
      vehicleNumber: this.vehicle.value !== 'none' ? (this.vehicleNumber.value ?? '') : undefined,
      profilePicturePath: this.photoFile ? URL.createObjectURL(this.photoFile) : undefined,
      createdAt: new Date().toISOString()
    };
  }

  onSubmit(): void {
    const helperData = this.previewHelper;
    const form = new FormData();

    form.append('name', this.name.value || '')
    form.append('phone', this.phone.value || '')
    form.append('gender', this.gender.value || '')
    form.append('email', this.email.value ?? '')
    form.append('typeOfService', this.service.value ?? '')
    form.append('organization', this.organization.value ?? '')
    if (this.languagesSelected.value && this.languagesSelected.value.length > 0) {
      for (let i = 0; i < this.languagesSelected.value.length; i++)
        form.append('languages', this.languagesSelected.value[i])
    }
    form.append('fileType',this.fileType)
    form.append('KYCDocument',this.file)
    form.append('vehicleType',this.vehicle.value ?? '')
    form.append('vehicleNumber',this.vehicle.value !== 'none' ? (this.vehicleNumber.value ?? '') : '')
    

    this.userdatailsservice.addhelper(helperData).subscribe({
      next: (res) => {
        console.log('Helper added successfully:', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding helper:', err);
      }
    });
  }
}
