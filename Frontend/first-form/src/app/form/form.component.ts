import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';

@Component({
  selector : 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {

  }

  onBack(){
    this.router.navigate(['/'])
  }
}
