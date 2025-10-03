import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeworksList } from './components/homeworks-list/homeworks-list';
import { HomeworkDetails } from './components/homework-details/homework-details';
import { AddHomework } from './components/add-homework/add-homework';

import { Register } from './register/register';
import { Login } from './login/login';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { BoardStudent } from './board-student/board-student';
import { BoardTeacher } from './board-teacher/board-teacher';
import { AuthGuard } from './services/auth-guard';
import { RoleGuard } from './services/role-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'homeworks', component: HomeworksList },
  { path: 'homeworks/add', component: AddHomework },
  { path: 'homeworks/:id', component: HomeworkDetails },
  //{ path: 'add', component: AddHomework },
  { path: 'home', component: Home },
  //{ path: 'login', component: Login },
  // { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  // { path: 'board-student', component: BoardStudent },
  // { path: 'board-teacher', component: BoardTeacher }
  {
    path: 'login',
    component: Login,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [AuthGuard]
  },
  {
    path: 'board-student',
    component: BoardStudent,
    canActivate: [RoleGuard],
    data: { role: 'student' }
  },
  {
    path: 'board-teacher',
    component: BoardTeacher,
    canActivate: [RoleGuard],
    data: { role: 'teacher' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
