import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  public doctors: any[] = [];
  public formGroup: FormGroup;
  public error: boolean = false;
  public mensage: string = "";

  private subscriptions: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly doctorService: DoctorService,
              private _router: Router) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.cleanForm();
  }

  createDoctors(): void {
    const controls = this.formGroup.controls;

    if(!controls.nome.valid){
      this.error = true;
      this.mensage = 'É necessário preencher o nome.';
      return;
    }

    if(!controls.crm.valid){
      this.error = true;
      this.mensage = 'É necessário preencher o CRM.';
      return;
    }

    const nome = controls.nome.value;
    const crm = controls.crm.value;

    this.subscriptions.add(
      this.doctorService.createDoctor({nome: nome, crm: crm}).subscribe(
          () => { 
            this._router.navigate(['/doctor']); 
          },
          (error: HttpErrorResponse) => {
              this.error = true;
              this.mensage = "Ocorreu um error inesperado.";
          }
      )
    );
  }


  cleanForm(): void {
    this.formGroup = this.formBuilder.group({
        nome: ['', Validators.required],
        crm: ['', Validators.required],
    });
  }

}
