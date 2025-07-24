import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHelperComponent } from './add-helper/add-helper.component';
import { DisplayHelperComponent } from './display-helper/display-helper.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'addhelper',
    component: AddHelperComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
