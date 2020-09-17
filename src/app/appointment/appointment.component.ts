import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public doctors: any[] = [];
  public formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly doctorService: DoctorService) { }

  ngOnInit() {
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
      console.log(this.doctors);
    });
  }


  cleanForm(): void {
    this.formGroup = this.formBuilder.group({
      doctor: ['', Validators.required],
      date: ['', [Validators.required, Validators.email]],
      doctors: []
  });
  }
}
