import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender, IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';

@Component({
  selector: 'app-employee-card',
  template: `
    <div class="card">
      <div class ="card-img-wrapper">
        <img class="card-img-top" src="assets/images/portrait.png">
        <ul class="list-inline text-center member-icons animate">
          <li class="list-inline-item">
            <button (click)=onEdit() class="btn btn-primary">Edit</button>
          </li>
          <li class="list-inline-item">
            <button (click)=onDelete() class="btn btn-delete">Delete</button>
          </li>
        </ul>
      </div>

      <img class="card-body p-1" >
      <h2>{{employee.firstName}}</h2>
      <h3>{{employee.lastName}}</h3>
    </div>
  `,
  styles: [`
    .card-img-wrapper {
      overflow: hidden;
      position: relative;
    }

    .card:hover img{
      transform: scale(1.1, 1.1);
      transition-duration: 300ms;
      transition-timing-function: ease-out;
      opacity: .4;

    }

    .card img{
      transform: scale(1, 1);
      transition-duration: 200ms;
      transition-timing-function: ease-out;
    }

    .member-icons{
      position: absolute;
      bottom: -15%;
      left: 0;
      right: 0;
      margin-right: auto;
      margin-left: auto;
      opacity: 0;
    }

    .card-img-wrapper:hover .member-icons{
      bottom: 0;
      opacity: 1;
    }

    .btn-delete {
      background-color: red
    }

    .animate{
      transition: all 0.3s ease-in-out;
    }
  `]
})
export class EmployeeCardComponent{

  @Input() employee: IEmployee

  constructor(private router: Router, private hiringService : HiringService) { }

  onEdit() {
    this.router.navigate(['/employee-detail/' + this.employee.id])
  }

  onDelete() {
    this.hiringService.deleteEmployee(this.employee.id).subscribe();

  }

}
