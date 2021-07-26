import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  httpClient: HttpClient;
  constructor(httpClient: HttpClient) { this.httpClient = httpClient;}

  getAllStudentData() {
    return this.httpClient.get<any>("http://65.1.20.88:8080/student/all");
  }
}
