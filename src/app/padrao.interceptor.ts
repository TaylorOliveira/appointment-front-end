import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { RequisicaoService } from './services/requisicao.service';

@Injectable()
export class PadraoInterceptor implements HttpInterceptor {

  constructor(private _loginService: LoginService, private _requisicaoService: RequisicaoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
        withCredentials: true
    });

    return next.handle(request).pipe(
        tap(ret => this._requisicaoService.finalizarRequisicao(request.url)),
        catchError((response: HttpErrorResponse) => {
            if (response.status == 403) {
                this._loginService.logout();
            }
            return throwError(response);
        })
    );
  }
}