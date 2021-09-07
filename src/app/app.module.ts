import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/Icon';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider'
import {MatMenuModule} from '@angular/material/menu'

import { AppComponent } from './app.component';
import { LecturadatosComponent } from './unidad1/lecturadatos/lecturadatos.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './shared/upload/upload.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    LecturadatosComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatIconModule,
    RouterModule.forRoot([
      {path: 'lecturadatos', component: LecturadatosComponent},
      {path: '', component: HomeComponent},
    ]),
    MatDividerModule,
    MatMenuModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
