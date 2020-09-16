import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { RequisicaoService } from './services/requisicao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent {

  usuario: string = sessionStorage['usuario'];
  processando = false;

  constructor(private _http: HttpClient, 
    private _router: Router, 
    private _loginService: LoginService,
    private _requisicaoService: RequisicaoService) { 

    _loginService.usuarioLogou$.subscribe(
      usuario => this.usuario = usuario
    );

    _loginService.usuarioDeslogou$.subscribe(
      ret => this.usuario = ''
    );

    _requisicaoService.iniciouRequisicao$.subscribe(
      ret => this.processando = true
    );

    _requisicaoService.finalizouRequisicao$.subscribe(
      ret => this.processando = false
    )
  }

  logout() {
    this.usuario = '';
    this._loginService.logout();
  }
}
