import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateSyntheticDataComponent } from './create-synthetic-data/create-synthetic-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from "@progress/kendo-angular-charts";
import { AppRoutingModule } from './app-routing.module';

import "hammerjs";
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SyntheticDataComponent } from './synthetic-data/synthetic-data.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
export const LOCAL_STORAGE = new InjectionToken<Storage>('localStorage');

@NgModule({
  declarations: [
    AppComponent,
    CreateSyntheticDataComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SyntheticDataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCheckboxModule, NgFor, FormsModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCAL_STORAGE, useValue: window.localStorage }, LocalStorageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
