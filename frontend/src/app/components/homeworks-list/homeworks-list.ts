import { Component, OnInit } from '@angular/core';
import { Homework } from '../../models/homework.model';
import { HomeworkService } from '../../services/homework';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeworks-list',
  standalone: false,
  templateUrl: './homeworks-list.html',
  styleUrl: './homeworks-list.css'
})
export class HomeworksList implements OnInit {
  // class properties
  homeworks: Homework[] = [];
  currentHomework: Homework = {};
  currentIndex = -1;
  title = '';
  isSearchMode = false;
  isSearchEmpty = false;
  students: any[] = []; // List of students for teacher to select
  selectedStudentId: number | null = null;

  constructor(
    private homeworkService: HomeworkService,
    private authService: AuthService,
    private router: Router
  ) {}

  // lifecycle hook
  ngOnInit(): void {
      if (this.isTeacher) {
        this.loadStudents();
      }
      this.retrieveHomeworks();//retrieve homeworks based on role
  }

  // Load all students for teacher to select
  loadStudents(): void {
    this.authService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Loaded students:', data);
      },
      error: (e) => console.error('Error loading students:', e)
    });
  }

  // Get homeworks based on role
  retrieveHomeworks(): void {
  if (this.isTeacher) {
    if (!this.selectedStudentId) {
      console.warn('No student selected.');
      this.homeworks = [];
      return;
    }

    this.homeworkService.getAll(this.selectedStudentId).subscribe({
      next: (data) => {
        this.homeworks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  } else {
    this.homeworkService.getAll().subscribe({
      next: (data) => {
        this.homeworks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}

  // Refresh the list of homeworks
  refreshList(): void {
    this.retrieveHomeworks();
    this.currentHomework = {};
    this.currentIndex = -1;
  }

  // Show details of selected homework
  setActiveHomework(homework: Homework, index: number): void {
    this.currentHomework = homework;
    this.currentIndex = index;
  }

  // Delete all homeworks **Old function**
  // removeAllHomeworks(): void {
  //   this.homeworkService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // Search homework by title
  searchTitle(): void {
    this.currentHomework = {};
    this.currentIndex = -1;
    this.isSearchMode = true;

    this.homeworkService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.homeworks = data;
          this.isSearchEmpty = data.length === 0;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Role check -teacher
  get isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  // Role check -student
  get isStudent(): boolean {
    return this.authService.isStudent();
  }

  // Get student name by ID
  getStudentName(id: number | string): string {
    const student = this.students.find(s => s.id == id);
    return student ? student.username : 'Unknown Student';
  }

  // Navigate to add homework page
  goToAddHomework(): void {
    this.router.navigate(['/homeworks/add']);
  }
}
