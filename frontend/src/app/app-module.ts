import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AddHomework } from './components/add-homework/add-homework';
import { HomeworkDetails } from './components/homework-details/homework-details';
import { HomeworksList } from './components/homeworks-list/homeworks-list';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    AddHomework,
    HomeworkDetails,
    HomeworksList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [App]
})
export class AppModule { }
