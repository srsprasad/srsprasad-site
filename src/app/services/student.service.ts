import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  allStudents: any;
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) { this.httpClient = httpClient;}

  getVerifiedAlumniStudents() {
    return this.httpClient.get<any[]>("https://srsprasad.github.io/ssm-data/alumni-pvpportal-verified-data.json");
  }

  getUnverifiedAlumniStudents() {
    return this.httpClient.get<any[]>("https://srsprasad.github.io/ssm-data/alumni-pvpportal-unverified-data.json");
  }
}
