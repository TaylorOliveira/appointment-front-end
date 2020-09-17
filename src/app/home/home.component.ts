import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public appointments: any[] = [];

  constructor(private router: Router, 
              private readonly appointmentService: AppointmentService) { }

  ngOnInit() {
    this.listAppointment();
  }

  public listAppointment(){
    this.appointmentService.listAppointment()
    .pipe(
        catchError((): Observable<any> => {
            return null;
        })
    ).subscribe((dados: any) => {
      console.log(dados);
      this.appointments = dados;
    });
  }

  getAppointments(){
    return this.appointments
  }
}
