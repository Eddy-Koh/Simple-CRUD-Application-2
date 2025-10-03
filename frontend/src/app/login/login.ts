import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class Login implements OnInit {
  // Form data
  form: any = {
    username: '',
    password: ''
  };

  // UI state
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userRole: string | null = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Check login status on init
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userRole = this.authService.getUserRole();
    }
  }

  // Handle login submission
  onSubmit(): void {
    const { username, password } = this.form;

    if (!username || !password) {
      this.errorMessage = 'Username and password are required.';
      this.isLoginFailed = true;
      return;
    }

    this.loading = true;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.userRole = data.role;
        this.loading = false;

        // Navigate to home and reload after login
        this.router.navigate(['/home']).then(() => {
            window.location.reload();
        });
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed.';
        this.isLoginFailed = true;
        this.loading = false;
      }
    });
  }
}
