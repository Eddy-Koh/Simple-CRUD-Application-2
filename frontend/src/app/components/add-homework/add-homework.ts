import { Component } from '@angular/core';
import { Homework } from '../../models/homework.model';
import { HomeworkService } from '../../services/homework';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-add-homework',
  standalone: false,
  templateUrl: './add-homework.html',
  styleUrl: './add-homework.css'
})
export class AddHomework {
  homework: Homework = { //hold the form data
    title: '',
    description: '',
    done: false
  };
  submitted = false;
  loading = false; // for spinner

  constructor(
    private homeworkService: HomeworkService,
    private authService: AuthService,
    private router: Router
  ) { }

  // back to homework list
  goBack(): void {
    this.router.navigate(['/homeworks']);
  }

  // save homework to db
  saveHomework(): void {
    if (!this.homework.title || !this.homework.description) return;

    this.loading = true;
    const data = {
      title: this.homework.title,
      description: this.homework.description,
    };

    const request = this.isTeacher
      ? this.homeworkService.addHomeworkForAllStudents(data)
      : this.homeworkService.create(data);

    request.subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  // add another homework
  newHomework(): void {
    this.submitted = false;
    this.homework = {
      title: '',
      description: '',
      done: false
    };
  }

  // check if user is teacher
  get isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  // check if user is student
  get isStudent(): boolean {
    return this.authService.isStudent();
  }
}
