import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-kyc-doc-dialog',
  templateUrl: './kyc-doc-dialog.component.html',
  styleUrl: './kyc-doc-dialog.component.css'
})
export class KycDocDialogComponent {
  @Input() closeDialog!:()=>void

  documentType=new FormControl('') 
   fileTypes: string[] = ['Adhaar card', 'PAN card', 'Voter ID', 'Passport']
  
   closeDialogFunc(){
     if(this.closeDialog){
       this.closeDialog()
     }
   }
}
