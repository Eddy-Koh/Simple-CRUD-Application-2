import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class Profile implements OnInit {
  currentUser: { username: string | null; role: string | null; token: string | null } = {
    username: null,
    role: null,
    token: null
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = {
      username: this.authService.getUsername(),
      role: this.authService.getUserRole(),
      token: this.authService.getToken()
    };
  }

  // Used for ngFor tracking (if needed)
  trackRole(index: number, role: string): string {
    return role;
  }

  // logout method
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
