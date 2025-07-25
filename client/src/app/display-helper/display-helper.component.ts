import { Component, Input, OnInit } from '@angular/core';
import { HelpersdetailsService } from '../helpersdetails.service';
import { Helper } from '../helpers.model';


@Component({
  selector: 'app-display-helper',
  templateUrl: './display-helper.component.html',
  styleUrls: ['./display-helper.component.css']
})
export class DisplayHelperComponent  {
  helper: Partial<Helper> = {};

  @Input()
  set helperid(value: string) {
    if (value) {
      this.userdatailsservice.getSingleHelperData(value).subscribe(
        response => {
          if (response.success) {
            this.helper = response.data as Partial<Helper>;
          } else {
            console.error('API returned failure');
          }
        },
      );
    } else {
      console.error('No helperid provided');
    }
  }

  constructor(private userdatailsservice: HelpersdetailsService) { }

}
