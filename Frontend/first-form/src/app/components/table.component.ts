import { Component, OnInit } from '@angular/core';
import { HiringService } from '../services/hiring.service';
import { IEmployee } from '../IEmployee.interface';

@Component({
  selector: 'app-table',
  template: `
  <div class="row">
    <div *ngFor="let employee of employees" class="shadow col-sm-4 p-3">
      <app-employee-card [employee]="employee"></app-employee-card>
    </div>
  </div>
  `,
  styles: []
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
