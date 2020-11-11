import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IEmployee } from '../IEmployee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiringService {

  constructor(private http:HttpClient) { }

  getAllEmployees() : Observable<IEmployee[]> {
    return this.http.get('data/employees.json').pipe(
      map(data => {
        const employeesArray : Array<IEmployee> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            employeesArray.push(data[id]);
          }
        }
        return employeesArray;
      })
    );
  }
}
