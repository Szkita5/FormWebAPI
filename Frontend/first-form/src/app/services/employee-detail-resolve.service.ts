import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from './hiring.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailResolveService implements Resolve<IEmployee> {

  constructor(private router: Router, private hiringService: HiringService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee>|IEmployee {
    const employeeId = route.params['id'];
    return this.hiringService.getEmployee(employeeId).pipe(
      catchError(error => {
        console.log('woopsie');
        console.log(error);
        this.router.navigate(['/']);
        //this.findNextEmployee(route);
        return of(null);
      })
    );
  }

  findNextEmployee(route: ActivatedRouteSnapshot) : Observable<IEmployee>|IEmployee {
    const employeeId = route.params['id'];
    let employees = Array<IEmployee>();
    let nextEmployee: IEmployee;
    this.hiringService.getAllEmployees().subscribe(
      data => {
        employees = data;
        console.log(data);
        console.log(data.length);

        for (let employee of employees) {
          if (employee.id > employeeId) {
            nextEmployee = employee;
            console.log(employee);
            return employee;
          }
        };
      }, error => {
        console.log(error);
      }
    );

    return nextEmployee;


  }

}
