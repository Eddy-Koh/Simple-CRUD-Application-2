import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeworksList} from './components/homeworks-list/homeworks-list';
import { HomeworkDetails } from './components/homework-details/homework-details';
import { AddHomework } from './components/add-homework/add-homework';

const routes: Routes = [
  { path: '', redirectTo: 'homeworks', pathMatch: 'full' },
  { path: 'homeworks', component: HomeworksList },
  { path: 'homeworks/:id', component: HomeworkDetails },
  { path: 'add', component: AddHomework }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
