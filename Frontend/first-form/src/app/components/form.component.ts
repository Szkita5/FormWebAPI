import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';

@Component({
  selector : 'app-form',
  template: `
  <div class="card">
    <div class="card-header">
      Add New Employee
    </div>
    <div class="card-body">
      <form [formGroup]="newEmployeeForm" (ngSubmit)="onSubmit()">

        <div class="form-group col-xs-12">
          <label for="firstName">First Name</label>
          <input type="text" class="form-control" formControlName="firstName">
        </div>

        <div class="form-group col-xs-12">
          <label for="lastName">Last Name</label>
          <input type="text" class="form-control" formControlName="lastName">
        </div>

        <div class="form-group col-xs-12">
          <button type="submit" class="btn btn-primary mr-2">Save</button>
          <button type="reset" class="btn btn-primary mr-2">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <button (click)='onBack()' class="btn btn-primary" >Back</button>
  `,
  styles: []
})
export class FormComponent implements OnInit {

  newEmployeeForm: FormGroup;
  newEmployee: any = {};

  constructor(private router: Router, private hiringService: HiringService) {}

  ngOnInit() {
    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('First Name', Validators.required),
      lastName: new FormControl('Last Name', Validators.required)
    });
  }

  onBack(){
    this.router.navigate(['/'])
  }

  //ToDo: fix any type, used because we do not know Id
  onSubmit() {
    this.addEmployee(this.newEmployeeForm.value);
  }

  addEmployee(newEmployee) {
    console.log(newEmployee);
    this.newEmployee = Object.assign(this.newEmployee, this.newEmployeeForm.value);
    this.hiringService.addNewEmployee(this.newEmployee).subscribe()
  }


}
