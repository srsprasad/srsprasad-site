import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public gridOptions: GridOptions;

  constructor() {

    this.gridOptions = this.gridOptions = <GridOptions>{
      enableSorting: true,
      enableFilter: true,
      pagination: true
    };

    this.gridOptions.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Toyota', model: 'Celica', price: 35000, status: 'Verified' },
      { make: 'Ford', model: 'Mondeo', price: 32000, status: 'Uploaded' },
      { make: 'Porsche', model: 'Boxter', price: 72000, status: 'Submitted' }
  ];

  this.gridOptions.columnDefs = [
        { field: 'make', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true },
        { field: 'status', sortable: true, filter: true}
    ];

    this.gridOptions.rowClassRules = {
      'orange-rows': function (params) { return params.data.status == 'Submitted'; },
      'green-rows':  function (params) { return params.data.status === 'Verified'; },
      'yellow-rows':  function (params) { return params.data.status == 'Uploaded'; }
    };
  }


  ngOnInit(): void {
  }

}
