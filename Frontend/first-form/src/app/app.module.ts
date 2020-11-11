import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { HiringService } from './services/hiring.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


const appRoutes: Routes = [
  {path:'', component: TableComponent},
  {path:'form', component: FormComponent},
  {path:'table', component: TableComponent},
  {path:'employee-detail/:id', component: EmployeeDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    NavBarComponent,
    EmployeeCardComponent,
    EmployeeDetailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HiringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
