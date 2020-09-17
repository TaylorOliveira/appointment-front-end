import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiFacade } from '../core/api.facade';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private readonly apiService: ApiFacade) {}

  public listDoctor(): Observable<any> {
    const url = '/api/listDoctors';
    return this.apiService.get<any>(url).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status == 404) {
                return null;
            }
            return throwError(error);
        })
    );
}
}
