import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public gridOptions: GridOptions;
  public httpClient: HttpClient;

  constructor( http: HttpClient ) {

    this.httpClient = http;
    this.gridOptions = this.gridOptions = <GridOptions>{
      pagination: true
    };

  this.gridOptions.columnDefs = [
      { field: 'status', headerName: 'Status',resizable: true,sortable: true, filter: true},
      { field: 'ALUMNI_NAME', headerName: 'Alumni Name',resizable: true, sortable: true, filter: true } ,
      { field: 'STUDENT_NAME', headerName: 'Student Name', sortable: true,resizable: true, filter: true },
      { field: 'SCHOOL_ID', headerName:'School ID', sortable: true,resizable: true, filter: 'agNumberColumnFilter' },
      { field: 'SCHOOL_NAMES', headerName: 'School Name', sortable: true,resizable: true, filter: true }
    ];
  }


  ngOnInit(): void {
    this.httpClient.get<any[]>('http://localhost:8080/student/all').subscribe(data=>{
      console.log(data);
      this.gridOptions.rowData = data;
    });

    this.gridOptions.rowClassRules = {
      'orange-rows': function (params) { return params.data.status == 'Submitted' },
      'green-rows':  function (params) { return params.data.status == 'Verified' },
      'yellow-rows':  function (params) { return params.data.status == 'Uploaded' }
    };
  }
}
