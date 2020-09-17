import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  public doctors: any[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
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

  getDoctors(){
    return this.doctors;
  }

}
