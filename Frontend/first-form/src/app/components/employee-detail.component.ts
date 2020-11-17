import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender, IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  template: `
    <button (click)='onBack()' class="btn btn-primary" >Back</button>
    <br/><br>
    Selected employee is {{employee.firstName}} {{employee.lastName}}. <br><br>

    <form [formGroup]="employeeDetailForm" (ngSubmit)="onSubmit()">

      <div class="form-group col-xs-12">
        <label for="employee.firstName">First Name</label>
        <input type="text" class="form-control" formControlName="firstNameField">
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.lastName">Last Name</label>
        <input type="text" class="form-control" formControlName="lastNameField">
      </div>

      <label for="employee.gender">Gender</label><br>
      <div class="col-xs-12">
        <div class="btn-group" btnRadioGroup name="Gender" formControlName="genderField">
          <label class="btn btn-outline-primary mr-2" btnRadio=0 role="button" name="Gender">Male</label>
          <label class="btn btn-outline-primary mr-2" btnRadio=1 role="button" name="Gender">Female</label>
          <label class="btn btn-outline-primary mr-2" btnRadio=2 role="button" name="Gender">Other</label>
        </div>
      </div>

      <div class="form-group col-xs-3">
        <label for="employee.birthDate">Date of Birth</label>
        <input type="date" class="form-control" formControlName="birthDateField">
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.email">e-mail address</label>
        <input type="text" class="form-control" formControlName="emailField">
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.lastName">Phone</label>
        <input type="text" class="form-control" formControlName="phoneNumberField">
      </div>


      <div class="form-group col-xs-12">
        <button type="submit" class="btn btn-primary mr-2">Save</button>
        <button type="reset" class="btn btn-danger mr-2">Cancel</button>
      </div>
    </form>
    <br/><br/>

    <div class="btn-group col-12">
      <button (click)="onPreviousEmployee()" class="btn btn-outline-primary mr-2">Previous Employee</button>
      <button (click)="onNextEmployee()" class="btn btn-outline-primary mr-2">Next Employee</button>
    </div>
  `,
  styles: []
})
export class EmployeeDetailComponent implements OnInit {

  public employee : IEmployee = {id: 0, firstName: "First", lastName: "Last", gender: 0, birthDate: new Date("0001-01-01T00:00:00"),  email: "",  phoneNumber: 0};
  public employeeId: number;
  public employeeDetailForm : FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private hiringService: HiringService) { }

  ngOnInit() {
    // Read EmployeeId from route
    this.employeeId = Number(this.route.snapshot.params['id']);

    this.employeeDetailForm = new FormGroup({
      firstNameField: new FormControl(this.employee.firstName , Validators.required),
      lastNameField: new FormControl(this.employee.lastName, Validators.required),
      genderField: new FormControl(this.employee.gender, Validators.required),
      birthDateField: new FormControl(this.employee.birthDate, Validators.required),
      emailField: new FormControl(this.employee.email, Validators.email),
      phoneNumberField: new FormControl(this.employee.phoneNumber)

    });


    // Subscription to load new employee details using RouteResolver on route change
    this.route.data.subscribe(
      (data: IEmployee) => {
        this.employee = data['ers'];
        this.employeeId = this.employee.id;
        console.log('from employee-detail component', this.employee);

        // Update default value of forms
        this.employeeDetailForm.patchValue({
          firstNameField: this.employee.firstName,
          lastNameField: this.employee.lastName,
          genderField: this.employee.gender,
          birthDateField: this.employee.birthDate.toString(),
          emailField: this.employee.email,
          phoneNumberField: this.employee.phoneNumber
        });
      }, (err: any) => console.log('in component', err),
      () => console.log('Complete')
    );
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onNextEmployee() {
    this.router.navigate(['employee-detail', this.employeeId + 1]);
  }

  onPreviousEmployee() {
    if(this.employeeId > 1) {
      this.router.navigate(['employee-detail', this.employeeId - 1]);
    }
  }

  onSubmit() {
    if (this.employeeDetailForm.valid) {
      this.modifyEmployee();
    } else {
      console.log("invalid form")
    }
  }

  modifyEmployee() {
    let newEmployee : IEmployee = {id: 0, firstName: "First", lastName: "Last", gender: 0, birthDate: new Date("0001-01-01T00:00:00"),  email: "",  phoneNumber: 0};
    let formVals = this.employeeDetailForm.value;

    newEmployee.id = this.employee.id;
    newEmployee.firstName = formVals.firstNameField;
    newEmployee.lastName = formVals.lastNameField;
    newEmployee.gender = formVals.genderField;
    newEmployee.birthDate = formVals.birthDateField;
    newEmployee.email = formVals.emailField;
    newEmployee.phoneNumber = formVals.phoneNumberField;
    console.log('submitting this: ', newEmployee)

    this.hiringService.modifyEmployee(newEmployee).subscribe();
  }
}
