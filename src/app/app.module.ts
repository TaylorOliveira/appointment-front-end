import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PadraoInterceptor } from './padrao.interceptor';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    HomeComponent,
    AppointmentComponent,
    DoctorFormComponent,
  ],
  imports: [
    NgSelectModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PadraoInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
