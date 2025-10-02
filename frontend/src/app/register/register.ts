import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule]
})
export class Register {
  // Form data
  form: any = {
    username: '',
    email: '',
    password: '',
    role: 'student' // default role
  };

  // UI state
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  // Handle form submission
  onSubmit(): void {
    const { username, email, password, role } = this.form;

    if (!username || !email || !password) {
      this.errorMessage = 'All fields are required.';
      this.isSignUpFailed = true;
      return;
    }

    this.loading = true;
    this.authService.register(username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error.message || 'Registration failed.';
        this.isSignUpFailed = true;
        this.loading = false;
      }
    });
  }

  //role options for dropdown
  get roles(): string[] {
    return ['student', 'teacher'];
  }
}
