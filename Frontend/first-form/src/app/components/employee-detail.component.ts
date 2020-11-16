import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-employee-detail',
  template: `
    <button (click)='onBack()' class="btn btn-primary" >Back</button>
    <br/>
    Selected employee is {{employee.firstName}} {{employee.lastName}}.

    <form [formGroup]="employeeDetailForm" (ngSubmit)="onSubmit()">

      <div class="form-group col-xs-12">
        <label for="employee.firstName">First Name</label>
        <input type="text" class="form-control" formControlName="firstNameField">
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.lastName">Last Name</label>
        <input type="text" class="form-control" formControlName="lastNameField">
      </div>

      <div class="form-group col-xs-12">
        <button type="submit" class="btn btn-primary mr-2">Save</button>
        <button type="reset" class="btn btn-primary mr-2">Cancel</button>
      </div>
    </form>
    <br/><br/>

    <button (click)="onNextEmployee()" class="btn btn-primary">Next Employee</button>
  `,
  styles: []
})
export class EmployeeDetailComponent implements OnInit {

  public employee : IEmployee;
  public employeeId: number;
  public employeeDetailForm : FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private hiringService: HiringService) { }

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params) => {
        this.employeeId = Number(params['id']);
      }
    )

    this.getCurrentEmployee();

    this.employeeDetailForm = new FormGroup({
      firstNameField: new FormControl(),
      lastNameField: new FormControl()
    });

  }

  onBack() {
    this.router.navigate(['/']);
  }

  onNextEmployee() {
    this.employeeId += 1;
    this.router.navigate(['employee-detail', this.employeeId + 1]);
    this.getCurrentEmployee();

  }

  getCurrentEmployee() {
    this.hiringService.getEmployee(this.employeeId).subscribe(
      data => {
        console.log(data);
        this.employee = data;
      }
    );
  }



  onSubmit() {}
}
