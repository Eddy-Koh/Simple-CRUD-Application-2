import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-17-crud');

  isLoggedIn = false;
  showTeacherBoard = false;
  showStudentBoard = false;
  username: string | null = null;
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
      this.role = this.authService.getUserRole();

      this.showTeacherBoard = this.role === 'teacher';
      this.showStudentBoard = this.role === 'student';
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        window.location.href = '/login';
      },
      error: err => {
        console.error('Logout failed:', err);
      }
    });
  }
}
