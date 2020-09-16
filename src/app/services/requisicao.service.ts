import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  private reqsAndamento = 0;

  private iniciouRequisicaoSource = new Subject<string>();
  private finalizouRequisicaoSource = new Subject<string>();

  iniciouRequisicao$ = this.iniciouRequisicaoSource.asObservable();
  finalizouRequisicao$ = this.finalizouRequisicaoSource.asObservable();

  constructor(private _http: HttpClient) { }

  post<T>(url: string, body: any) {
    this.iniciarRequisicao(url);
    return this._http.post<T>(url, body);
  }

  get<T>(url: string) {
    this.iniciarRequisicao(url);
    return this._http.get<T>(url);
  }

  private iniciarRequisicao(url?: string) {
    this.reqsAndamento++;
    console.log(`iniciar (${url})... ${this.reqsAndamento}`);
    this.iniciouRequisicaoSource.next();
  }

  finalizarRequisicao(url?: string) {
    this.reqsAndamento--;
    console.log(`finalizar (${url})... ${this.reqsAndamento}`);
    if (this.reqsAndamento <= 0) {
      this.finalizouRequisicaoSource.next();
      if (this.reqsAndamento < 0) {
        this.reqsAndamento = 0;
      }
    }
  }
}
