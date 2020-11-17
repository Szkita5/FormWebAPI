

// // Check if there exists an emplloyee with nonsequential ID
// let employees = Array<IEmployee>();
// let nextEmployee: IEmployee;
// this.hiringService.getAllEmployees().subscribe(
//   data => {
//     employees = data;
//     console.log(data);
//     console.log(data.length);

//     for (let employee of employees) {
//       if (employee.id > employeeId) {
//         nextEmployee = employee;
//         console.log('here', employee);
//         return of(employee);
//       }
//     };
//   }, error => {
//     console.log(error);
//   }, () => {console.log("complete")}
//   );

//   return of(nextEmployee);
