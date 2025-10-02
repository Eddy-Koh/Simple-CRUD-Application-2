import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeworkService } from '../services/homework';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-teacher',
  templateUrl: './board-teacher.html',
  styleUrls: ['./board-teacher.css'],
  imports: [CommonModule, FormsModule],
})
export class BoardTeacher implements OnInit {
  content?: string;
  errorMessage?: string;
  showAddHomeworkForm = false;
  newHomework = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(
    private userService: UserService,
    private homeworkService: HomeworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getTeacherBoard().subscribe({
      next: data => {
        console.log('Teacher board data:', data);
        this.content = data.message;
      },
      error: err => {
        console.error(err);
        try {
          this.errorMessage = err.error ? JSON.parse(err.error).message : `Error with status: ${err.status}`;
        } catch {
          this.errorMessage = 'Unexpected error occurred.';
        }
      }
    });
  }

  // **Old version**
  // submitHomework(): void {
  //   this.homeworkService.addHomeworkForAllStudents(this.newHomework).subscribe({
  //     next: () => {
  //       alert('Homework assigned to all students!');
  //       this.showAddHomeworkForm = false;
  //     },
  //     error: (err) => {
  //       console.error('Error adding homework:', err);
  //     }
  //   });
  // }

  goToAddHomework(): void {
    this.router.navigate(['/homeworks/add']);
  }
}
