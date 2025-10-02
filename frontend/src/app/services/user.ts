import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Attach token for protected routes
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'x-access-token': token || ''
      })
    };
  }

  // Public content
  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8080/', { responseType: 'json' });
  }

  // Student board
  getStudentBoard(): Observable<any> {
    return this.http.get(API_URL + 'student', this.getAuthHeaders());
  }

  // Teacher board
  getTeacherBoard(): Observable<any> {
    return this.http.get(API_URL + 'teacher', this.getAuthHeaders());
  }
}
