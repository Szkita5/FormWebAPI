import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { IEmployee } from '../IEmployee.interface';
import { HiringService } from './hiring.service';

@Injectable({
  providedIn: 'root'
})
export class AllEmployeesResolveService implements Resolve<IEmployee[]> {

  constructor(private hiringService: HiringService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.hiringService.getAllEmployees().pipe(
      catchError(error => {
        console.log(error);
        throw Error(error);
      })
    )
  }
}
