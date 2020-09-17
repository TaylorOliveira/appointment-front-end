import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { StringUtil } from './string-util';

@Injectable({
    providedIn: 'root'
})
export class ApiFacade {

    constructor(
        private readonly http: HttpClient
    ) { }

    public post<T>(path: string, body: any): Observable<T> {
        const url: string = this.construirUrl(path);
        return this.http.post<T>(url, body);
    }

    public get<T>(path: string): Observable<T> {
        const url: string = this.construirUrl(path);
        return this.http.get<T>(url);
    }

    private construirUrl(path: string): string {
        if (StringUtil.isBlank(path)) {
            return env.base_api_url;
        }
        return env.base_api_url + path;
    }

}
