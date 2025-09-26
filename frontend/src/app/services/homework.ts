// Create Data Service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from '../models/homework.model';

//root of backend API
const baseUrl = 'http://localhost:8080/api/homeworks';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  constructor(private http: HttpClient) { } //for making HTTP requests

  //get all homeworks
  getAll(): Observable<Homework[]> {
    return this.http.get<Homework[]>(baseUrl);
  }

  //get homework by id
  get(id: any): Observable<Homework> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  //send POST request to create new homework
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  //send PUT request to update homework by id
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  //send DELETE request to delete homework by id
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  //send DELETE request to delete all homeworks
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  //get homeworks by title, find keyword of title
  findByTitle(title: any): Observable<Homework[]> {
    return this.http.get<Homework[]>(`${baseUrl}?title=${title}`);
  }
}
