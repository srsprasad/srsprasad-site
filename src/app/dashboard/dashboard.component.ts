import { Component, OnInit } from '@angular/core';
import {
  ColumnApi,
  GridApi,
  GridOptions,
  RowClassParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { StudentService } from '../services/student.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentService],
})
export class DashboardComponent implements OnInit {
  public gridOptions: GridOptions;
  private httpClient: HttpClient;
  private studentService: StudentService;
  private organization: OrganizationService;
  lastUpdatedOn: any = '26-Jul-2021';
  rowData: any[] = [];
  vibharList: any[] = [];

  vibhag = {
    model: {
      all: true,
      googleForm: false,
    },
    options: {
      disableAll: false,
    },
  };

  agApi: any;
  agColumnApi: any;

  constructor(
    http: HttpClient,
    studentService: StudentService,
    organization: OrganizationService
  ) {
    this.studentService = studentService;
    this.httpClient = http;
    this.organization = organization;

    //Initialization Vibhag List
    this.organization.getVibhagList().subscribe((data) => {
      this.vibharList = data;
    });
    this.reset();
    this.gridOptions = <GridOptions>{
      pagination: true,
    };

    this.gridOptions.columnDefs = [
      {
        headerName: 'Data Updated As On:- ' + this.lastUpdatedOn,
        children: [
          {
            field: 'status',
            headerName: 'Status',
            resizable: true,
            sortable: true,
            filter: true,
          },
          {
            field: 'ALUMNI_ID',
            headerName: 'Alumni Id',
            sortable: true,
            resizable: true,
            valueGetter: this.studentIdGetter,
          },
          {
            field: 'ALUMNI_NAME',
            headerName: 'Alumni Name',
            resizable: true,
            sortable: true,
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
            valueGetter: this.schoolNameGetter,
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
            field: 'SUBMITTED_ON',
            headerName: 'Submitted On',
            sortable: true,
            resizable: true,
          },
        ],
      },
    ];
    this.loadStudentData([]);
  }

  ngOnInit(): void {
    this.gridOptions.rowClassRules = {
      'orange-rows': (params: RowClassParams) =>
        params.data.status === 'Submitted',
      'yellow-rows': (params: RowClassParams) =>
        params.data.status === 'Uploaded',
      'green-rows': (params: RowClassParams) =>
        params.data.status === 'Verified',
    };
  }

  loadStudentData(schoolIds: any[]) {
    this.studentService.getAllStudentData().subscribe((response) => {
      this.lastUpdatedOn = response.lastUpdateOn;
      let data:any[];
      if (!this.vibhag.model.googleForm) {
        data = [].concat(
          response.verifiedData,
          response.uploadedData,
          response.uploadedSingleData
        );
      } else {
        data= [].concat(response.googleFormData);
      }
      if (schoolIds.length > 0){
        this.rowData = data.filter(e=>this.isEligibleForView(e, schoolIds));
      }else {
        this.rowData = data;
      }
    });
  }

  isEligibleForView(e: any, schoolIds: any[]) {
    return schoolIds.filter((id) => id == e.SCHOOL_ID).length > 0;
  }

  schoolNameGetter = (params: ValueGetterParams) => {
    return params.data.SCHOOL_NAME ? params.data.SCHOOL_NAME : '';
  };

  studentIdGetter = (params: ValueGetterParams) => {
    return params.data.ALUMNI_ID ? params.data.ALUMNI_ID : (params.data.studentId? params.data.studentId : '');
  };

  filterChange(): void {
    let mergedSchoolIds: any[] = [];
    if (this.vibhag.model.all) {
      this.vibhag.options.disableAll = true;
      this.reset();
    } else {
      this.vibhag.options.disableAll = false;
      let filterSchoolIds = this.vibharList
        .filter((element) => element.checked)
        .map((data) => data.schoolIdList);
      if (filterSchoolIds.length > 0) {
        mergedSchoolIds = [].concat.apply([], filterSchoolIds);
      }
    }
    this.loadStudentData(mergedSchoolIds);
  }

  reset(): void {
    this.vibhag.options.disableAll = this.vibhag.model.all;
    this.vibharList.forEach((element) => {
      element.checked = !this.vibhag.model.all;
    });
  }
}
