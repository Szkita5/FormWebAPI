import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../IEmployee.interface';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee : IEmployee;

  public employeeId: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.params['id']);

  }

  onBack() {
    this.router.navigate(['/']);
  }

  onNextEmployee() {
    this.employeeId += 1;
    this.router.navigate(['employee-detail', this.employeeId]);
  }
}
