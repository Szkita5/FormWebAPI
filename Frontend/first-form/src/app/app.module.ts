import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './components/app.component';
import { FormComponent } from './components/form.component';
import { TableComponent } from './components/table.component';
import { HiringService } from './services/hiring.service';
import { NavBarComponent } from './components/nav-bar.component';
import { EmployeeCardComponent } from './components/employee-card.component';
import { EmployeeDetailComponent } from './components/employee-detail.component';
import { EmployeeDetailResolveService } from './services/employee-detail-resolve.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  {path:'', component: TableComponent},
  {path:'form', component: FormComponent},
  {path:'table', component: TableComponent},
  {path:'employee-detail/:id', component: EmployeeDetailComponent, resolve: {ers: EmployeeDetailResolveService}}
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    ButtonsModule,
    BrowserAnimationsModule
  ],
  providers: [
    HiringService,
    EmployeeDetailResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
