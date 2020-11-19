import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';

@Component({
  selector: 'app-employee-info',
  template: `
    <button (click)='onBack()' class="btn btn-outline-primary" >Back</button>
    <br/><br>

    <div>
      <div class="form-group col-xs-12">
        <label for="employee.firstName">First Name:</label><br>
        <label for="employee.firstName">{{this.employee.firstName}}</label>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.firstName">Last Name:</label><br>
        <label for="employee.firstName">{{this.employee.lastName}}</label>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.firstName">Gender:</label><br>
        <label for="employee.firstName">{{this.displayGender}}</label>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.firstName">Date of Birth:</label><br>
        <label for="employee.firstName">{{this.employee.birthDate}}</label>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.firstName">E-mail address:</label><br>
        <label for="employee.firstName">{{this.employee.email}}</label>
      </div>

      <div class="form-group col-xs-12">
        <label for="employee.firstName">Phone number:</label><br>
        <label for="employee.firstName">{{this.employee.phoneNumber}}</label>
      </div>
    </div>
    <br>

    <div class="btn-group col-4">
      <button (click)="onEdit()" class="btn btn-outline-primary mr-2">Edit Details</button>
      <button (click)="onDelete()" class="btn btn-outline-danger mr-2">Delete Employee</button>
    </div>
    <br/><br/>

    <div class="btn-group col-12">
      <button (click)="onPreviousEmployee()" class="btn btn-outline-primary mr-2">Previous Employee</button>
      <button (click)="onNextEmployee()" class="btn btn-outline-primary mr-2">Next Employee</button>
    </div>
  `,
  styles: []
})
export class EmployeeInfoComponent implements OnInit {

  public employee : IEmployee = {id: 0, firstName: "First", lastName: "Last", gender: 0, birthDate: new Date("0001-01-01T00:00:00"),  email: "",  phoneNumber: 0};
  public employeeId: number;
  public displayGender: string;

  constructor(private route: ActivatedRoute, private router: Router, private hiringService: HiringService) { }

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.params['id']);

    this.route.data.subscribe(
      (data: IEmployee) => {
        this.employee = data['ers'];
        this.employeeId = this.employee.id;

        switch(this.employee.gender){
          case 0: {this.displayGender = 'Male'; break;}
          case 1: {this.displayGender = 'Female'; break;}
          case 2: {this.displayGender = 'Other'; break;}
        }
        console.log('from employee-info component', this.employee);
      },
      (err: any) => console.log('in component', err),
      () => console.log('Complete')
    );
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onNextEmployee() {
    this.router.navigate(['employee-info', this.employeeId + 1]);
  }

  onPreviousEmployee() {
    if(this.employeeId > 1) {
      this.router.navigate(['employee-info', this.employeeId - 1]);
    }
  }

  onEdit() {
    this.router.navigate(['employee-detail', this.employeeId]);
  }

  onDelete() {
    if(confirm('Are you sure you want to delete the records of '+ this.employee.firstName +' '+this.employee.lastName+'?')) {
      this.hiringService.deleteEmployee(this.employee.id).subscribe();
      this.router.navigate(['/']);
    }
  }

}
