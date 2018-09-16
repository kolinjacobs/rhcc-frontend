import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError, map, share, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { throwError as observableThrowError } from 'rxjs/index';
import { environment } from '../api-service/configs/environment';
import { ApiConfig } from '../api-service/configs/api.config';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(config: ApiConfig, params: Object = {}, opts: any = {}): Observable<any> {
    const method = config.METHOD;
    const url = this.interpolate(`${environment.weatherUrl}${config.URL}`, opts);
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

  private interpolate(url, props): string {
    _.forIn(props, (value, key) => {
      url = url.replace(`{${key}}`, value);
    });

    return url;
  }
}
