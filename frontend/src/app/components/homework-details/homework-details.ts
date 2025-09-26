import { Component, Input, OnInit } from '@angular/core';
import { HomeworkService } from '../../services/homework';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../../models/homework.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homework-details',
  standalone: false,
  templateUrl: './homework-details.html',
  styleUrl: './homework-details.css'
})
export class HomeworkDetails implements OnInit{
  @Input() viewMode = false;

  @Input() currentHomework: Homework = {
    title: '',
    description: '',
    done: false
  };

  @Input() homeworks: Homework[] = [];

  message = ''; //use to display success/error messages

  constructor(
    private homeworkService: HomeworkService,
    private route: ActivatedRoute,
    private router: Router) { }

    //lifecycle hook
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getHomework(this.route.snapshot.params["id"]); //get id from url
    }
  }

  // get data of a specific homework
  getHomework(id: string): void {
    this.homeworkService.get(id)
      .subscribe({
        next: (data) => {
          this.currentHomework = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  //change the done status of the current homework
  updateDone(status: boolean): void {
    this.currentHomework.done = status;
    this.message = 'Click the "Update" button to save the change >.<';
  }

  //update the current homework
  updateHomework(): void {
    this.message = '';

    this.homeworkService.update(this.currentHomework.id, this.currentHomework)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This homework was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  //delete the current homework
  deleteHomework(): void {
    this.homeworkService.delete(this.currentHomework.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/homeworks']);
        },
        error: (e) => console.error(e)
      });
  }

  //navigate back to the homework list
  goBack(): void {
    this.router.navigate(['/homeworks']);
  }
}
