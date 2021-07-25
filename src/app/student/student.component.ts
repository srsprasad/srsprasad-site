import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentService: StudentService;
  studentRecords:any[] =[];

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  ngOnInit(): void {
  }

}
