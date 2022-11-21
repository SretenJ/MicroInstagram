import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PhotoService} from "./photo.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import { NgxPaginationModule } from 'ngx-pagination';

import { EditComponentDialogComponent } from './edit-photo-dialog/edit-component-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EditComponentDialogComponent,
    AddDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [PhotoService,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
