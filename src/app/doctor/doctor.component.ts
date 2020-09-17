import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  doctors: any[] = 
    [
      {
        "id": 1,
        "nome": "TAYLOR SANTOS OLIVEIRA",
        "crm": "56789/RQE 0001"
      }
    ];

  constructor() { }

  ngOnInit() {
    console.log(this.doctors);
  }

  getDoctors(){
    return this.doctors;
  }

}
