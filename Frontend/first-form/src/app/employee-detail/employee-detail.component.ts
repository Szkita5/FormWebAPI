import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  public employeeId: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
