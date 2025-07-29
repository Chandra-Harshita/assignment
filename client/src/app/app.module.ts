// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AddHelperComponent } from './add-helper/add-helper.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { DisplayHelperComponent } from './display-helper/display-helper.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ListofhelpersComponent } from './listofhelpers/listofhelpers.component';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { KycDocDialogComponent } from './kyc-doc-dialog/kyc-doc-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AddHelperComponent,
    DisplayHelperComponent,
    ListofhelpersComponent,
    HomeComponent,
    KycDocDialogComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MatIconButton,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
