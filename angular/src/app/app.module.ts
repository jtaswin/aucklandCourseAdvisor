import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FakeData } from './shared/fake-data';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ConfirmDeleteComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [FakeData],
  bootstrap: [AppComponent],
})
export class AppModule {}
