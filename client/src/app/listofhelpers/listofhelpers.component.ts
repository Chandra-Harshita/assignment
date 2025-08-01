import { Component, EventEmitter, Input, OnInit, Output, ɵprovideZonelessChangeDetection } from '@angular/core';
import { HelpersdetailsService } from '../helpersdetails.service';
import { Helper, helpers } from '../helpers.model';


@Component({
  selector: 'app-listofhelpers',
  templateUrl: './listofhelpers.component.html',
  styleUrl: './listofhelpers.component.css'
})
export class ListofhelpersComponent {
    helper: string = '';
    helpersData:helpers[]=[]
   @Input() set helpersDetails(data: helpers[]) {
    if (data) {
      this.helpersData=data
      this.helper = data[0]?._id
    }
  }
  @Input() set sortField(field:string){
      if(field=='name'){
       this.helpersData.sort((a,b)=>a.name.localeCompare(b.name))
    }
    else{
       console.log("hey there")
       console.log(this.helpersData)
       this.helpersData.sort((a,b)=>a.employeeCode-b.employeeCode)
    }
    this.helper = this.helpersData[0]?._id
  }
  @Output() updateList=new EventEmitter<string>()
  constructor(private userdatailsservice: HelpersdetailsService) { }

  //async initialData() {
  //  return new Promise<void>(async (resolve) => {
  //    await this.getAllHelpers();
  //    resolve();
  //  })
  // }

  getPath(helper:Partial<Helper>):string{
    return `http://localhost:3000/${helper.profilePicturePath}`
  }

  onHelperClick(id: string) {
    this.helper = id
  }
  onUserDeleted(): void {
    this.updateList.emit()
  }
}
