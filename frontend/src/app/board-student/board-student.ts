import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-student',
  templateUrl: './board-student.html',
  styleUrls: ['./board-student.css'],
  imports: [CommonModule]
})
export class BoardStudent implements OnInit {
  content?: string;
  errorMessage?: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getStudentBoard().subscribe({
      next: data => {
        console.log('Student board data:', data);
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
}
