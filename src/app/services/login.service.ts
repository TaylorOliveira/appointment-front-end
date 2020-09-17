import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RequisicaoService } from './requisicao.service';

interface Usuario {
  nome: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: string = '';

  constructor(private _http: HttpClient, 
    private _router: Router,
    private _requisicaoService: RequisicaoService) { }
  
  private usuarioLogouSource = new Subject<string>();
  private usuarioDeslogouSource = new Subject<string>();

  usuarioLogou$ = this.usuarioLogouSource.asObservable();
  usuarioDeslogou$ = this.usuarioDeslogouSource.asObservable();
  
  logarUsuario(login: string, senha: string) {
    
    const params = new HttpParams()
      .set('username', login)
      .set('password', senha);
    
    return this._requisicaoService.post(`${environment.base_api_url}/login`, params).pipe(
      tap(
        sucesso => this.searchUser().subscribe(
          usuario => {
            sessionStorage['usuario'] = usuario.nome;
            this.usuarioLogouSource.next(usuario.nome);
          }
        )
      )
    )
  }

  searchUser() {
    return this._requisicaoService.get<Usuario>(`${environment.base_api_url}/api/user`)
  }

  logout() {
    return this._requisicaoService.get(`${environment.base_api_url}/logout`).subscribe(
      ret => {
        sessionStorage.clear();
        this.usuarioDeslogouSource.next('logout');
        this._router.navigate(['/login']);
      }
    )
  }
}
