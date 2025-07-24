import { Component, OnInit } from '@angular/core';
import { HelpersdetailsService } from '../helpersdetails.service';
import { helpers } from '../helpers.model';


@Component({
  selector: 'app-listofhelpers',
  templateUrl: './listofhelpers.component.html',
  styleUrl: './listofhelpers.component.css'
})
export class ListofhelpersComponent implements OnInit {
  helpersData: helpers[] = []
  helper: string = '';
  constructor(private userdatailsservice: HelpersdetailsService) { }

  ngOnInit() {
    this.initialData();
  }

  async initialData() {
    return new Promise<void>(async (resolve) => {
      await this.getAllHelpers();
      resolve();
    })
  }



  getAllHelpers() {
    this.userdatailsservice.getData().subscribe(response => {
      if (response.success) {
        this.helpersData = response.data;
        this.helper = this.helpersData[0]._id;
      }
      else
        console.error('API returned failure');
      
    })
  }
  onHelperClick(id: string) {
    this.helper = id
  }
}
