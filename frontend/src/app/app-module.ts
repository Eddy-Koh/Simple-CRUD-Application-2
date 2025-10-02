import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AddHomework } from './components/add-homework/add-homework';
import { HomeworkDetails } from './components/homework-details/homework-details';
import { HomeworksList } from './components/homeworks-list/homeworks-list';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Standalone components
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { BoardStudent } from './board-student/board-student';
import { BoardTeacher } from './board-teacher/board-teacher';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // Only non-standalone components go here
    App,
    AddHomework,
    HomeworkDetails,
    HomeworksList,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Login,
    Register,
    Home,
    Profile,
    BoardStudent,
    BoardTeacher,
    RouterModule,
  ],

  providers: [],
  bootstrap: [App]
})
export class AppModule { }
