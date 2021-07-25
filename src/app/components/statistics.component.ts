import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnChanges {

  private studentService: StudentService;

  @Input() data: any[] =[];

  statistics: any = {
    'total': {'count': 0},
    'verified': {'name':'Verified', 'count': 0, 'description':'Registration completed successfully.'},
    'uploaded':{'name': 'Uploaded', 'count': 0, 'description': 'Registration details are stored but verification is pending.'},
    'submitted':{'name': 'Submitted', 'count': 0, 'description': 'Registration details are received in Excelsheet.Upload is pending.'}
  };

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  ngOnChanges(changes: SimpleChanges){
    if (this.data != null){
      this.statistics.total.count = this.data.length;
      this.statistics.verified.count = this.data.filter(d=>d.status == 'Verified').length;
      this.statistics.uploaded.count = this.data.filter(d=>d.status == 'Uploaded').length;
      this.statistics.submitted.count = this.data.filter(d=>d.status == 'Submitted').length;
    }

  }
}
