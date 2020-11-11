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
    return this.http.get('http://localhost:5000/api/employee').pipe(
      map(data => {
        const employeesArray : Array<IEmployee> = [];
        for (const member in data) {
          if (data.hasOwnProperty(member)) {
            employeesArray.push(data[member]);
          }
        }
        return employeesArray;
      })
    );
  }
}
