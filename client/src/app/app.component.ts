import { Component, OnInit } from '@angular/core';
import { HelpersdetailsService } from './helpersdetails.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userdatailsservice: HelpersdetailsService) { }

}
