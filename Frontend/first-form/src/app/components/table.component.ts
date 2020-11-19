import { Component, OnInit } from '@angular/core';
import { HiringService } from '../services/hiring.service';
import { Gender, IEmployee } from '../IEmployee.interface';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private hiringService: HiringService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: IEmployee[]) => {
        this.employees = data['aer'];
      }
    )
  }
}
