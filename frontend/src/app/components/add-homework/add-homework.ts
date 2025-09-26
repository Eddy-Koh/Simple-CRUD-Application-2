import { Component } from '@angular/core';
import { Homework } from '../../models/homework.model';
import { HomeworkService } from '../../services/homework';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private homeworkService: HomeworkService,
    private router: Router
  ) { }

  // back to homework list
  goBack(): void {
    this.router.navigate(['/homeworks']);
  }

  // save homework to db
  saveHomework(): void {
    const data = {
      title: this.homework.title,
      description: this.homework.description
    };

    this.homeworkService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
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
}
