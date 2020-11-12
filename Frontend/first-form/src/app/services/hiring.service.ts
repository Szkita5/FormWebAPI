import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IEmployee } from '../IEmployee.interface';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

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

  //ToDo: Uding any, because we do not want to send the Id
  addNewEmployee(newEmployee : any) : Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/employee/post', newEmployee);
  }

  deleteEmployee(id: number) : Observable<any> {
    return this.http.delete('http://localhost:5000/api/employee/delete/' + id );
  }
}
