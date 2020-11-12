import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';

@Component({
  selector : 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
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
