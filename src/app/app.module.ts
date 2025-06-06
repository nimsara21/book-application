// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; // If you're still using a routing module
import { AppComponent } from './app.component';         // standalone
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  // No declarations since components are standalone
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppComponent,           // must be standalone
    BookListComponent,      // standalone - imported, not declared
    BookFormComponent       // standalone - imported, not declared
  ],
  providers: []
})
export class AppModule {}
