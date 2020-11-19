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
    <button (click)='onBack()' class="btn btn-outline-primary" >Back</button>
    <br/><br>
    Selected employee is {{employee.firstName}} {{employee.lastName}}. <br><br>

    <form [formGroup]="employeeDetailForm" (ngSubmit)="onSubmit()">

      <div class="form-group col-xs-12">
        <label for="employee.firstName">First Name</label>
        <input type="text" class="form-control" formControlName="firstNameField">
        <span class="error-block" *ngIf="!firstName.valid && firstName.touched">
          First name is required.
        </span>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.lastName">Last Name</label>
        <input type="text" class="form-control" formControlName="lastNameField">
        <span class="error-block" *ngIf="!lastName.valid && lastName.touched">
          Last name is required.
        </span>
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
        <span class="error-block" *ngIf="!birthDate.valid && birthDate.touched">
          Date is required.
        </span>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.email">E-mail address</label>
        <input type="text" class="form-control" formControlName="emailField">
        <span class="error-block" *ngIf="!email.valid && email.touched">
          Enter a valid e-mail address.
        </span>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.lastName">Phone number</label>
        <input type="text" class="form-control" formControlName="phoneNumberField">
        <span class="error-block" *ngIf="!phoneNumber.valid && phoneNumber.touched">
          Enter a valid phone number.
        </span>
      </div>


      <div class="form-group col-xs-12">
        <button type="submit" class="btn btn-primary mr-2">Save</button>
        <button (click)='onBack()' type="reset" class="btn btn-danger mr-2">Cancel</button>
      </div>
    </form>
    <br/><br/>
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
      emailField: new FormControl(this.employee.email, [Validators.required, Validators.email]),
      phoneNumberField: new FormControl(this.employee.phoneNumber, [Validators.minLength(8), Validators.maxLength(10)])
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
    this.router.navigate(['employee-info', this.employeeId]);
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
    newEmployee.gender = Number(formVals.genderField);
    newEmployee.birthDate = formVals.birthDateField;
    newEmployee.email = formVals.emailField;
    newEmployee.phoneNumber = Number(formVals.phoneNumberField);
    console.log('submitting this: ', newEmployee)

    this.hiringService.modifyEmployee(newEmployee).subscribe();
    this.router.navigate(['employee-info', this.employeeId]);
  }

  // Getter methods for form validation
  get firstName() {
    return this.employeeDetailForm.get('firstNameField') as FormControl;
  }

  get lastName() {
    return this.employeeDetailForm.get('lastNameField') as FormControl;
  }

  get gender() {
    return this.employeeDetailForm.get('genderField') as FormControl;
  }

  get birthDate() {
    return this.employeeDetailForm.get('birthDateField') as FormControl;
  }

  get email() {
    return this.employeeDetailForm.get('emailField') as FormControl;
  }

  get phoneNumber() {
    return this.employeeDetailForm.get('phoneNumberField') as FormControl;
  }
}
