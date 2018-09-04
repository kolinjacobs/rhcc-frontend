import { Http } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {ApiConfig} from './configs/api.config';
import {environment} from './configs/environment';
import { catchError, map, switchMap, share } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  request(config: ApiConfig, params: Object = {}, opts: any = {}): Observable<any> {
    const method = config.METHOD;
    const url = this.interpolate(`${environment.httpUrl}${config.URL}`, opts);
    const ob = this.http.request(method, url)
        .pipe(
            map(data => data),
            catchError((error: any) => {
                return observableThrowError(this.createError(error));
            }),
            share()
        );
    return ob;
  }

  createError(errorResponse) {
    return {
      data: errorResponse.error,
      status: errorResponse.status,
      message: errorResponse.message
    };
  }

  private getParams(params): HttpParams {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      httpParams = httpParams.set(key, params[key]);
    }

    return httpParams;
  }


  private interpolate(url, props): string {
    _.forIn(props, (value, key) => {
      url = url.replace(`{${key}}`, value);
    });

    return url;
  }
}
