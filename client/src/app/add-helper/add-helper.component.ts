import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycDocDialogComponent } from '../kyc-doc-dialog/kyc-doc-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../helpers.model';
import { HelpersdetailsService } from '../helpersdetails.service';

@Component({
  selector: 'app-add-helper',
  templateUrl: './add-helper.component.html',
  styleUrls: ['./add-helper.component.css']
})
export class AddHelperComponent implements OnInit {

  userId: string | null = null;
  step: number = 1;
  helper!: Partial<Helper>
  edit: boolean = false
  originalHelperData: Partial<Helper> = {};
  kycPath:string=''
  name = new FormControl('', Validators.required);
  languagesSelected = new FormControl<string[]>([], Validators.required);
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
  languages: string[] = ['telugu', 'english', 'hindi', 'tamil', 'malayalam', 'bengali'];
  vehicleTypes: string[] = ['none', 'car', 'bike', 'auto'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userdetailsservice: HelpersdetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')
    if (this.userId) this.editHelper(this.userId)
  }

  editHelper(id: string) {
    this.edit = true
    this.userdetailsservice.getSingleHelperData(id).subscribe(
      response => {
        if (response.success) {
          this.helper = response.data as Partial<Helper>;
          this.originalHelperData = { ...this.helper };
          this.name.setValue(this.helper.name ?? '')
          this.service.setValue(this.helper.typeOfService ?? '')
          this.organization.setValue(this.helper.organization ?? '')
          this.languagesSelected.setValue(this.helper.languages ?? [])
          this.gender.setValue(this.helper.gender ?? '')
          this.phone.setValue(this.helper.phone ? String(this.helper.phone) : '')
          this.email.setValue(this.helper.email ?? '')
          this.vehicle.setValue(this.helper.vehicleType ?? '')
          this.vehicleNumber.setValue(this.helper.vehicleNumber ?? '')
          this.fileType=this.helper.fileType??''
          this.kycPath=`http://localhost:3000/${this.helper.filePath}`
          this.file!=this.helper.KYCDocument
        } else {
          console.error('API returned failure');
        }
      },
      error => {
        console.error('Failed to load helper data', error);
      }
    );

  }
  triggerFileInput():void{
     this.openDialog()
  }
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
  onClickSideBar(s: number) {
    if (s == 1) this.step = 1
    else if (this.isStepOneValid()) {
      this.step = s;
    } else {
      this.markAllStepOneControlsTouched();
    }
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

  createFormData(): FormData {
    const form = new FormData();

    form.append('name', this.name.value || '')
    form.append('phone', this.phone.value || '')
    form.append('gender', this.gender.value || '')
    form.append('email', this.email.value ?? '')
    form.append('typeOfService', this.service.value ?? '')
    form.append('organization', this.organization.value ?? '')
    form.append('languages', this.languagesSelected.value ? this.languagesSelected.value?.join(',') : '')
    // if (this.languagesSelected.value && this.languagesSelected.value.length > 0) {
    //   for (let i = 0; i < this.languagesSelected.value.length; i++)
    //     form.append('languages', this.languagesSelected.value[i])
    // }
    form.append('fileType', this.fileType)
    form.append('vehicleType', this.vehicle.value ?? '')
    form.append('vehicleNumber', this.vehicle.value !== 'none' ? (this.vehicleNumber.value ?? '') : '')
    form.append('KYCDocument', this.file);
    //console.log(">>>>>>>>>>>",this.file)
    if (this.photoFile) form.append('profilePicture', this.photoFile)
    // for (var pair of (form as any).entries()) {
    //  console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log("here", form)
    return form
  }

  getUpdatedFields(): Partial<Helper> {
  const updated: Partial<Helper> = {};

  if (this.name.value !== this.originalHelperData.name) updated.name = this.name.value??'';
  if (this.phone.value !== String(this.originalHelperData.phone ?? '')) updated.phone = Number(this.phone.value);
  if (this.gender.value !== this.originalHelperData.gender) updated.gender = this.gender.value??'';
  if (this.email.value !== this.originalHelperData.email) updated.email = this.email.value??'';
  if (this.service.value !== this.originalHelperData.typeOfService) updated.typeOfService = this.service.value??'';
  if (this.organization.value !== this.originalHelperData.organization) updated.organization = this.organization.value??'';
  if ((this.languagesSelected.value || []).toString() !== (this.originalHelperData.languages || []).toString())
    updated.languages = this.languagesSelected.value ?? [];
  if (this.vehicle.value !== this.originalHelperData.vehicleType) updated.vehicleType = this.vehicle.value??'';
  if (this.vehicle.value !== 'none' && this.vehicleNumber.value !== this.originalHelperData.vehicleNumber)
    updated.vehicleNumber = this.vehicleNumber.value??'';

  if (this.file && this.file !== this.helper.KYCDocument) {
    updated.KYCDocument = this.file;
    updated.fileType = this.fileType;
  }

  if (this.photoFile) {
    updated.profilePicture = this.photoFile;
  }

  return updated;
}


  onSubmit(): void {
    const form = this.createFormData();
    // console.log(form)
    this.userdetailsservice.addhelper(form).subscribe({
      next: (res) => {
        // console.log('Helper added successfully:', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding helper:', err);
      }
    });
  }
  onSave() {
  if (!this.userId) return;

  const updatedFields = this.getUpdatedFields();

  const form = new FormData();
  for (const key in updatedFields) {
    const val = updatedFields[key as keyof Helper];
    if (val instanceof File) {
      form.append(key, val);
    } else if (Array.isArray(val)) {
      form.append(key, val.join(','));
    } else if (val !== undefined) {
      form.append(key, val.toString());
    }
  }

  this.userdetailsservice.updateHelper(this.userId, form).subscribe({
    next: res => {
      console.log('Helper updated successfully:', res);
      this.router.navigate(['/']);
    },
    error: err => {
      console.error('Error updating helper:', err);
    }
  });
    // if(this.userId) this.userdatailsservice.updateHelper(this.userId,form).subscribe({
    //   next: (res) => {
    //      console.log('Helper updated successfully:', res);
    //     this.router.navigate(['/']);
    //   },
    //   error: (err) => {
    //     console.error('Error adding helper:', err);
    //   }
    // });
  }
  selectAllLanguages(){
    if(this.languagesSelected.value?.length==6) this.languagesSelected.setValue([]) 
    else  this.languagesSelected.setValue([...this.languages,""])
  }
}
