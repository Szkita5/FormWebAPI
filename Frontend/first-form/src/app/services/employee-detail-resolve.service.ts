import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, timeout } from 'rxjs/operators';
import { Gender, IEmployee } from '../IEmployee.interface';
import { HiringService } from './hiring.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailResolveService implements Resolve<IEmployee> {

  constructor(private hiringService: HiringService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee> {
    const employeeId = route.params['id'];
    return this.hiringService.getEmployee(employeeId).pipe(
      // If no employee with given ID exists, an error is thrown
      catchError(error => {
        console.log('Route did not resolve, entering catchError() and rethrowing error.');

        // ToDo: Implement code to find next employee, use

        throw Error(error);
      })
    );
  }
}

      // findNextEmployee(route: ActivatedRouteSnapshot) : Observable<IEmployee>|IEmployee {
      //   const employeeId = route.params['id'];
      //   let employees = Array<IEmployee>();
      //   let nextEmployee: IEmployee;
      //   this.hiringService.getAllEmployees().subscribe(
      //     data => {
      //       employees = data;
      //       console.log(data);
      //       console.log(data.length);

      //       for (let employee of employees) {
      //         if (employee.id > employeeId) {
      //           nextEmployee = employee;
      //           console.log(employee);
      //           return employee;
      //         }
      //       };
      //     }, error => {
      //       console.log(error);
      //     }
      //     );

      //     return nextEmployee;


      //   }

      // }
