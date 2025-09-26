import { Component, OnInit } from '@angular/core';
import { Homework } from '../../models/homework.model';
import { HomeworkService } from '../../services/homework';

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

  constructor(private homeworkService: HomeworkService) { }

  ngOnInit(): void {
    this.retrieveHomeworks(); //retrieve all homeworks on component initialization
  }

  //Get all homeworks
  retrieveHomeworks(): void {
    this.homeworkService.getAll()
      .subscribe({
        next: (data) => {
          this.homeworks = data; //store data in homeworks array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  //Refresh the list of homeworks
  refreshList(): void {
    this.retrieveHomeworks();
    this.currentHomework = {};
    this.currentIndex = -1;
  }

  //show details of selected homework
  setActiveHomework(homework: Homework, index: number): void {
    this.currentHomework = homework;
    this.currentIndex = index;
  }

  //Delete all homeworks
  removeAllHomeworks(): void {
    this.homeworkService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  //Search homework by title
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

}
