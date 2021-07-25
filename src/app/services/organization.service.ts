import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  httpClient: HttpClient;

  vibhagList: any[]=[
    {key: 'palamur', name: 'Palamur', schoolIdList:[731], checked: true},
    {key: 'rangareddy', name: 'Ranga Reddy', schoolIdList: [808], checked: true},
    {key: 'bhagyanagar', name: 'Bhagyanagar', schoolIdList: [756], checked: true},
    {key: 'warangalurban', name: 'Warangal Urban', schoolIdList: [809], checked: true},
    {key: 'sirisilla', name: 'Sirisilla', schoolIdList: [714], checked: true},
  ];

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getVibhagList():Observable<any[]> {
    return this.httpClient.get<any[]>("http://65.1.20.88:8080/school/district/all");
  }
}
