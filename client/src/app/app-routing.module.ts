import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHelperComponent } from './add-helper/add-helper.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'addhelper',
    component: AddHelperComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'edithelper/:id',
    component:AddHelperComponent
  },{
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
