import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, RouterModule],
})
export class Home implements OnInit {
  content?: string;
  username: string | null = null;
  role: string | null = null;
  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch public content
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data.message;
      },
      error: err => {
        console.error(err);
        try {
          this.content = err.error ? JSON.parse(err.error).message : `Error with status: ${err.status}`;
        } catch {
          this.content = 'Unexpected error occurred.';
        }
      }
    });

    // Check login status and get user info
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.authService.getUsername();
      this.role = this.authService.getUserRole();
    }
  }
}
