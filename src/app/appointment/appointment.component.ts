import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorService } from '../services/doctor.service';
import { AppointmentService } from '../services/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public doctors: any[] = [];
  public formGroup: FormGroup;
  public error: boolean = false;
  public mensage: string = "";

  private subscriptions: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly doctorService: DoctorService,
              private readonly appointmentService: AppointmentService,
              private _router: Router) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.cleanForm();
    this.listDoctor();
  }

  public listDoctor(){
    this.doctorService.listDoctor()
    .pipe(
        catchError((): Observable<any> => {
            return null;
        })
    ).subscribe((dados: any) => {
      this.doctors = dados;
    });
  }

  createAppointment(): void {
    const controls = this.formGroup.controls;

    if(!controls.doctor.valid){
      this.error = true;
      this.mensage = 'É necessário selecionar um médico.';
      return;
    }

    const doctor = controls.doctor.value;

    this.subscriptions.add(
      this.appointmentService.createAppointment({doctorId: doctor}).subscribe(
          () => { 
            this._router.navigate(['/home']); 
          },
          (error: HttpErrorResponse) => {
              this.error = true;
              this.mensage = "Ocorreu um error inesperado.";
          }
      )
    );
  }

  getError(){
    return this.error;
  }

  cleanForm(): void {
    this.formGroup = this.formBuilder.group({
        doctor: ['', Validators.required],
        doctors: []
    });
  }
}
