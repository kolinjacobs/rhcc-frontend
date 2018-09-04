import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AVAILABLE_SERVICES } from '../../../../../services/api-service/configs/api.config';
import * as fromCountries from '../../actions/countries/countries.actions';
import { ApiService } from '../../../../../services/api-service/api.service';
import { of } from 'rxjs/index';

@Injectable()
export class CountriesEffects {

  @Effect()
  loadCountries$ = this.actions$
    .ofType(fromCountries.CountriesActionTypes.LOAD_COUNTRIES)
    .pipe(
      switchMap(() => {
        return this.service.request(AVAILABLE_SERVICES.GET_COUNTRIES).pipe(
          map(countries => {
            return new fromCountries.LoadCountriesSuccess(countries);
          }),
          catchError(error => of (new fromCountries.LoadCountriesFail(error)))
        );
      })
    );

  @Effect()
  loadCountriesData$ = this.actions$
    .ofType(fromCountries.CountriesActionTypes.LOAD_COUNTRIES_DATA)
    .pipe(
      switchMap(() => {
        return this.service.request(AVAILABLE_SERVICES.GET_COUNTRIES_DATA).pipe(
          map(countries => {
            return new fromCountries.LoadCountryDataSuccess(countries);
          }),
          catchError(error => of (new fromCountries.LoadCountryDataFail(error)))
        );
      })
    );

  @Effect()
  loadCountriesMissions$ = this.actions$
    .ofType(fromCountries.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS)
    .pipe(
      map((action: fromCountries.LoadCountryMissions) => action.payload),
      switchMap((payload) => {
        return this.service.request(AVAILABLE_SERVICES.GET_MISSIONS, {}, {id: payload.tid}).pipe(
          map(missions => {
            return new fromCountries.LoadCountryMissionsSuccess(missions, payload.tid);
          }),
          catchError(error => of (new fromCountries.LoadCountryDataFail(error)))
        );
      })
    );

  @Effect()
  loadCountriesMissionsData$ = this.actions$
    .ofType(fromCountries.CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA)
    .pipe(
      map((action: fromCountries.LoadCountryMissionsData) => action.payload),
      switchMap((payload) => {
        return this.service.request(AVAILABLE_SERVICES.GET_MISSIONS_DATA, {}, {id: payload.mission_id}).pipe(
          map(missionsData => {
            return new fromCountries.LoadCountryMissionsDataSuccess(missionsData, payload);
          }),
          catchError(error => of (new fromCountries.LoadCountryMissionsDataFail(error)))
        );
      })
    );

  constructor(private actions$: Actions, private service: ApiService) {}
}
