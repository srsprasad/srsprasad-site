import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions, RowClassParams } from 'ag-grid-community';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public gridOptions: GridOptions;
  private httpClient: HttpClient;

  vibhag = {
    model: {
      all: true,
      palamur: false,
      rangareddy: false,
      bhagyanagar: false,
      warangalUrban: false,
      sirisilla: false,
    },
    options: {
      disableAll: false,
    },
  };

  constructor(http: HttpClient) {
    this.httpClient = http;
    this.reset();
    this.gridOptions = <GridOptions>{
      pagination: true,
    };

    this.gridOptions.columnDefs =[
      {
        headerName: 'Data Updated On:- 20-Jul-2021',
        children: [
          {
            field: 'status',
            headerName: 'Status',
            resizable: true,
            sortable: true,
            filter: true,
          },
          {
            field: 'ALUMNI_NAME',
            headerName: 'Alumni Name',
            resizable: true,
            sortable: true,
            filter: true,
          },
          {
            field: 'STUDENT_NAME',
            headerName: 'Student Name',
            sortable: true,
            resizable: true,
            filter: true,
          },
          {
            field: 'SCHOOL_ID',
            headerName: 'School ID',
            sortable: true,
            resizable: true,
            filter: 'agNumberColumnFilter',
          },
          {
            field: 'SCHOOL_NAMES',
            headerName: 'School Name',
            sortable: true,
            resizable: true,
            filter: true,
          },
          {
            field: 'EMAIL_ID',
            headerName: 'Email Id',
            sortable: true,
            resizable: true,
            filter: true,
          },
          {
            field: 'CONTACT_NUMBER',
            headerName: 'Contact No',
            sortable: true,
            resizable: true,
            filter: true,
          },
        ]
    }
    ];
  }

  ngOnInit(): void {
    this.httpClient
      .get<any[]>('http://localhost:8080/student/all')
      .subscribe((data) => {
        console.log(data);
        this.gridOptions.rowData = data;
      });
    this.gridOptions.rowClassRules = {
      'orange-rows': (params: RowClassParams) =>
        params.data.status === 'Submitted',
      'yellow-rows': (params: RowClassParams) =>
        params.data.status === 'Uploaded',
      'green-rows': (params: RowClassParams) =>
        params.data.status === 'Verified',
    };
  }

  filterChange(): void {
    console.log(this.vibhag);
    if (this.vibhag.model.all) {
      this.vibhag.options.disableAll = true;
      this.reset();
    } else {
      this.vibhag.options.disableAll = false;
    }
  }

  reset(): void {
    this.vibhag.model.bhagyanagar =
      this.vibhag.model.palamur =
      this.vibhag.model.rangareddy =
      this.vibhag.model.bhagyanagar =
      this.vibhag.model.warangalUrban =
      this.vibhag.model.sirisilla =
        !this.vibhag.model.all;
    this.vibhag.options.disableAll = this.vibhag.model.all;
  }
}
