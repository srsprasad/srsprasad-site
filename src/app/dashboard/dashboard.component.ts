import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, RowClassParams, ValueGetterParams } from 'ag-grid-community';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { StudentService } from '../services/student.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StudentService]
})
export class DashboardComponent implements OnInit {
  public gridOptions: GridOptions;
  private httpClient: HttpClient;
  private studentService: StudentService;
  private organization: OrganizationService;
  rowData: any;
  vibharList: any[];

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

  agApi: any;
  agColumnApi: any;

  constructor(http: HttpClient, studentService: StudentService, organization: OrganizationService) {
    this.studentService = studentService;
    this.httpClient = http;
    this.organization = organization;

    //Initialization Vibhag List
    this.vibharList = this.organization.getVibhagList();
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
            field: 'CONTACT_NUMBER',
            headerName: 'Contact No',
            sortable: true,
            resizable: true,
            filter: true,
          },
        ]
    }
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
    let verAlumniData = this.studentService.getVerifiedAlumniStudents();
    let unverAlumniData = this.studentService.getUnverifiedAlumniStudents();
    forkJoin([verAlumniData, unverAlumniData]).subscribe(result=>{
      result[0].forEach(data=>data.status='Verified');
      result[1].forEach(data=>data.status='Uploaded');
      if (schoolIds.length > 0){
        console.log("Applying filter with :", schoolIds);
        this.rowData = result[0].concat(result[1]).filter(e=>this.isEligibleForView(e, schoolIds));
      }else{
        console.log("No filters applied");
        this.rowData = result[0].concat(result[1]);
      }
    });
  }

  isEligibleForView (e:any, schoolIds: any[]) {
    return schoolIds.filter(id=> id == e.SCHOOL_ID).length > 0 ;
  }

  schoolNameGetter= (params: ValueGetterParams)=>{
    return params.data.SCHOOL_NAME + params.data.SCHOOL_NAMES;
  };

  filterChange(): void {
    let mergedSchoolIds:any[] = [];
    if (this.vibhag.model.all) {
      this.vibhag.options.disableAll = true;
      this.reset();
    } else {
      this.vibhag.options.disableAll = false;
      let filterSchoolIds = this.vibharList.filter(element=> element.checked).map(data=>data.schoolIdList);
      if (filterSchoolIds.length > 0) {
        mergedSchoolIds = [].concat.apply([],filterSchoolIds);
        console.log(mergedSchoolIds);
      }
    }
    this.loadStudentData(mergedSchoolIds);
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
    this.vibharList.forEach(element => {
      element.checked = !this.vibhag.model.all;
    });
  }
}
