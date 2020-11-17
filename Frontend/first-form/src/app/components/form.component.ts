import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, IEmployee } from '../IEmployee.interface';
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
          <span class="error-block" *ngIf="!firstName.valid && firstName.touched">
            First name is required.
          </span>
        </div>

        <div class="form-group col-xs-12">
          <label for="lastName">Last Name</label>
          <input type="text" class="form-control" formControlName="lastName">
          <span class="error-block" *ngIf="!lastName.valid && lastName.touched">
            Last name is required.
          </span>
        </div>

        <label for="employee.gender">Gender</label><br>
        <div class="col-xs-12">
          <div class="btn-group" btnRadioGroup name="Gender" formControlName="gender">
            <label class="btn btn-outline-primary mr-2" btnRadio=0 role="button" name="Gender">Male</label>
            <label class="btn btn-outline-primary mr-2" btnRadio=1 role="button" name="Gender">Female</label>
            <label class="btn btn-outline-primary mr-2" btnRadio=2 role="button" name="Gender">Other</label>
          </div>
        </div>

        <div class="form-group col-xs-3">
          <label for="employee.birthDate">Date of Birth</label>
          <input type="date" class="form-control" formControlName="birthDate">
          <span class="error-block" *ngIf="!birthDate.valid && birthDate.touched">
            Date is required.
          </span>
        </div>

        <div class="form-group col-xs-12">
          <label for="employee.email">E-mail address</label>
          <input type="text" class="form-control" formControlName="email">
          <span class="error-block" *ngIf="!email.valid && email.touched">
            Enter a valid e-mail address.
          </span>
        </div>

        <div class="form-group col-xs-12">
          <label for="employee.lastName">Phone</label>
          <input type="text" class="form-control" formControlName="phoneNumber">
          <span class="error-block" *ngIf="!phoneNumber.valid && phoneNumber.touched">
            Enter a valid phone number.
          </span>
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
      lastName: new FormControl('Last Name', Validators.required),
      gender: new FormControl(2, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      email: new FormControl('example@domain.mail', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.minLength(8), Validators.maxLength(10)])
    });
  }

  onBack(){
    this.router.navigate(['/'])
  }

  //ToDo: fix any type, used because we do not know Id
  onSubmit() {
    this.addEmployee();
  }

  addEmployee() {
    if (this.newEmployeeForm.valid) {
      this.newEmployee = Object.assign(this.newEmployee, this.newEmployeeForm.value);
      this.newEmployee.gender = Number(this.newEmployee.gender);
      this.newEmployee.phoneNumber = Number(this.newEmployee.phoneNumber);
      console.log('posting data to HTTP server: ', this.newEmployee)
      this.hiringService.addNewEmployee(this.newEmployee).subscribe();
    } else {
      console.log('Invalid form.')
    }

  }

  // Getter methods for form validation
  get firstName() {
    return this.newEmployeeForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.newEmployeeForm.get('lastName') as FormControl;
  }

  get gender() {
    return this.newEmployeeForm.get('gender') as FormControl;
  }

  get birthDate() {
    return this.newEmployeeForm.get('birthDate') as FormControl;
  }

  get email() {
    return this.newEmployeeForm.get('email') as FormControl;
  }

  get phoneNumber() {
    return this.newEmployeeForm.get('phoneNumber') as FormControl;
  }
}
