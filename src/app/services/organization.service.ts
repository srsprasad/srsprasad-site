import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  vibhagList: any[]=[
    {key: 'palamur', name: 'Palamur', schoolIdList:[731], checked: true},
    {key: 'rangareddy', name: 'Ranga Reddy', schoolIdList: [808], checked: true},
    {key: 'bhagyanagar', name: 'Bhagyanagar', schoolIdList: [756], checked: true},
    {key: 'warangalurban', name: 'Warangal Urban', schoolIdList: [809], checked: true},
    {key: 'sirisilla', name: 'Sirisilla', schoolIdList: [714], checked: true},
  ];

  constructor() { }

  getVibhagList():any[] {
    return this.vibhagList.sort((a,b)=>{return (a.key<b.key)? -1: (a.key == b.key)?0: 1});
  }
}
