// Create Data Service
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from '../models/homework.model';

//root of backend API
const baseUrl = 'http://localhost:8080/api/homeworks';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  constructor(private http: HttpClient) { } //for making HTTP requests

  // Helper to attach token to headers
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'x-access-token': token || ''
      })
    };
  }

  // get all homeworks **Old Function**
  // getAll(): Observable<Homework[]> {
  //   return this.http.get<Homework[]>(baseUrl);
  // }

  // get all homeworks (role-aware)
  getAll(studentId?: number): Observable<Homework[]> {
    const url = studentId ? `${baseUrl}?studentId=${studentId}` : baseUrl;
    return this.http.get<Homework[]>(url, this.getAuthHeaders());
  }

  //get homework by id
  get(id: number): Observable<Homework> {
    return this.http.get<Homework>(`${baseUrl}/${id}`, this.getAuthHeaders());
  }

  //send POST request to create new homework
  create(data: Homework): Observable<any> {
    return this.http.post(baseUrl, data, this.getAuthHeaders());
  }

  //send PUT request to update homework by id
  update(id: number, data: Partial<Homework>): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, this.getAuthHeaders());
  }

  //send DELETE request to delete homework by id
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, this.getAuthHeaders());
  }

  // send DELETE request to delete all homeworks **Old Function**
  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl, this.getAuthHeaders());
  // }

  //get homeworks by title, find keyword of title
  findByTitle(title: string): Observable<Homework[]> {
    return this.http.get<Homework[]>(`${baseUrl}?title=${title}`, this.getAuthHeaders());
  }

  // to add homework for all students (teacher only)
  addHomeworkForAllStudents(homework: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post('http://localhost:8080/api/homeworks/add-all', homework, { headers });
  }
}
