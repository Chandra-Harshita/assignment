import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersdetailsService } from '../helpersdetails.service';
import { Helper, helpers } from '../helpers.model';
import { response } from 'express';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  helpersData: helpers[] = []
  services: string[] = ['maid', 'cook', 'nurse', 'driver', 'plumber', 'newspaper', 'laundry'];
  organizations: string[] = ['ASBL', 'Springs Helpers'];
  servicesSelected =new FormControl<string[]>([])
  organizationsSelected=new FormControl<string[]>([])
  filterDropdownOpen=false
  TotHelpers:number=0
  isApply:boolean=false
  searchPattern:string=''
  sortField:string='name'
  sortDropDown:boolean=false
  isActiveName:boolean=true
  isActiveId:boolean=false

  constructor(private router: Router,private userdatailsservice: HelpersdetailsService) { }
  goToHome() {
    this.router.navigate(['/addhelper']);
  }
  ngOnInit(){
    this.getAllHelpers()
  }
  getAllHelpers() {
    this.userdatailsservice.getData({sortField:this.sortField}).subscribe(response => {
      if (response.success) {
        this.helpersData = response.data as helpers[];
        this.TotHelpers=this.helpersData.length
      }
      else
        console.error('API returned failure');
    })
  }
  getSpecificUsers(flag?:boolean){
    this.isApply=true
    if(flag){this.toogleFilter()}
    const details={typeOfService:this.servicesSelected.value,organization:this.organizationsSelected.value,name:this.searchPattern,sortField:this.sortField}
    this.userdatailsservice.getSpecificUsers(details).subscribe(response =>{
      if(response.success){
         console.log(response.data)
          this.helpersData=response.data as helpers[]
      }
      else
        console.error('API returned failure');
    })
  }
  toogleFilter(){
    this.filterDropdownOpen=!this.filterDropdownOpen
  }
  toogleSort(){
    this.sortDropDown=!this.sortDropDown
  }
  resetServices(){
     this.servicesSelected.setValue([])
  }
  resetOrganization(){
    this.organizationsSelected.setValue([])
  }
  resetFilters(){
     this.resetServices()
     this.resetOrganization()
  }
  selectAllServices(){
    if(this.servicesSelected.value?.length==7) this.servicesSelected.setValue([]) 
    else  this.servicesSelected.setValue([...this.services,'selectAll'])
  }
  selectAllOrganizations(){
    if(this.organizationsSelected.value?.length==2) this.organizationsSelected.setValue([])
    else this.organizationsSelected.setValue([...this.organizations,'selectAll'])
  }
  selectName(){
    console.log('selected name')
    this.isActiveName=true
    this.isActiveId=false
    this.sortField='name'
    this.getAllHelpers()
  }
  selectId(){
    console.log('selected ID')
     this.isActiveName=false
    this.isActiveId=true
    this.sortField='employeeCode'
    this.getAllHelpers()
  }
}
