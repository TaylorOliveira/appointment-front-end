import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'doctor/create', component: DoctorFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
