import { Component, Input, OnInit } from '@angular/core';
import { HomeworkService } from '../../services/homework';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../../models/homework.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-homework-details',
  standalone: false,
  templateUrl: './homework-details.html',
  styleUrl: './homework-details.css'
})
export class HomeworkDetails implements OnInit {
  @Input() viewMode = false; //used to toggle between view-only and editable mode

  @Input() currentHomework: Homework = {
    title: '',
    description: '',
    done: false
  };

  @Input() homeworks: Homework[] = []; //optional list of homeworks

  message = ''; //used to display success/error messages

  constructor(
    private homeworkService: HomeworkService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // lifecycle hook
  ngOnInit(): void {
  if (!this.viewMode) {
    this.message = '';
    const idParam = this.route.snapshot.params["id"];
    const id = Number(idParam);

    if (!idParam || isNaN(id)) {
      console.warn('Invalid or missing homework ID:', idParam);
      this.message = 'Invalid homework ID.';
      return;
    }

    this.getHomework(id);
  }
}

  // get the homework by id
  getHomework(id: number): void {
    this.homeworkService.get(id).subscribe({
      next: (data) => {
        this.currentHomework = data;
        console.log('Homework loaded:', data);
      },
      error: (e) => {
        console.error('Error loading homework:', e);
        this.message = e.error?.message || 'Homework not found.';
      }
    });
  }

  // change the done status of the current homework
  updateDone(status: boolean): void {
    if (this.isTeacher) {
      this.currentHomework.done = status;
      this.message = 'Click the "Update" button to save the change >.<';
    } else {
      this.message = 'Only teachers can mark homework as done.';
    }
  }

  // update the current homework
  updateHomework(): void {
    this.message = '';

    //Still haven't fix yet
    // Students can only update their own homework
    // if (this.isStudent && this.currentHomework.createdByTeacher) {
    //   this.message = 'You cannot edit homework assigned by a teacher.';
    //   return;
    // }

    this.homeworkService.update(this.currentHomework.id!, this.currentHomework)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This homework was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  // delete the current homework
  deleteHomework(): void {
    // Still haven't fix yet
    // if (this.isStudent && this.currentHomework.createdByTeacher) {
    //   this.message = 'You cannot delete homework assigned by a teacher.';
    //   return;
    // }

    this.homeworkService.delete(this.currentHomework.id!)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/homeworks']);
        },
        error: (e) => console.error(e)
      });
  }

  // navigate back to the homework list
  goBack(): void {
    this.router.navigate(['/homeworks']);
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
