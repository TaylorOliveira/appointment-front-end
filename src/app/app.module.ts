import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PadraoInterceptor } from './padrao.interceptor';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    HomeComponent,
    AppointmentComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfigFunction)
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
