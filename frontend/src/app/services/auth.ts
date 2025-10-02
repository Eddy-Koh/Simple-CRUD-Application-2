import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('accessToken') || ''
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    );
  }

  // Register with optional role
  register(username: string, email: string, password: string, role: string = 'student'): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        roles: [role] // backend expects array
      },
      httpOptions
    );
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Get user role from localStorage
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Get username
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Get full user object
  getUser(): { username: string; role: string } | null {
    const username = this.getUsername();
    const role = this.getUserRole();
    return username && role ? { username, role } : null;
  }

  // Save user info
  saveUser(user: any): void {
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('username', user.username);
    this.saveToken(user.accessToken);
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if user is teacher
  isTeacher(): boolean {
    return this.getUserRole() === 'teacher';
  }

  // Check if user is student
  isStudent(): boolean {
    return this.getUserRole() === 'student';
  }

  // Clear session
  clearSession(): void {
    localStorage.clear();
  }

  // Fetch all students (for teachers)
  getAllStudents(): Observable<UserService[]> {
    const token = localStorage.getItem('accessToken');

    const headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get<UserService[]>('http://localhost:8080/api/users?role=student', headers);
  }
}
