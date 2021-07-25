import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  httpClient: HttpClient;
  constructor(httpClient: HttpClient) { this.httpClient = httpClient;}

  getAllStudentData() {
    return this.httpClient.get<any>("http://localhost:8080/student/all");
  }
}
