import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from '../services/hiring.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
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
