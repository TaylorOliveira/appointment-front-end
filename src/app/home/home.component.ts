import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  appointments: any[] = 
    [
        {
            "id": 1,
            "doctorResponse": {
                "id": 1,
                "nome": "TAYLOR SANTOS OLIVEIRA",
                "crm": "56789/RQE 0001"
            },
            "patientResponse": {
                "id": 1,
                "name": "JULIANA MATTOS",
                "cpf": "04778667190"
            },
            "apponintmentTime": "2020-09-16T22:39:11.506+00:00"
        }
    ];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.appointments);
  }

  getAppointments(){
    return this.appointments
  }
}
