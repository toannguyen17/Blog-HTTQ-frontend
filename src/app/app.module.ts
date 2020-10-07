import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
