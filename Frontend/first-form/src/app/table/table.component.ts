import { Component, OnInit } from '@angular/core';
import { HiringService } from '../services/hiring.service';
import { IEmployee } from '../IEmployee.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  employees: Array<IEmployee>;
  constructor(private hiringService: HiringService) { }

  ngOnInit(): void {
    this.hiringService.getAllEmployees().subscribe(
        data => {
          this.employees = data;
        }, error => {
          console.log(error);
        }
      );
  }

}
