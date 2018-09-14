import { Action } from '@ngrx/store';
import {Country} from '../../../models/country.model';

export enum CountriesActionTypes {
  LOAD_COUNTRIES = '[COUNTRIES] LOAD_COUNTRIES',
  LOAD_COUNTRIES_FAIL = '[COUNTRIES] LOAD_COUNTRIES_FAIL',
  LOAD_COUNTRIES_SUCCESS = '[COUNTRIES] LOAD_COUNTRIES_SUCCESS',
  LOAD_COUNTRIES_DATA = '[COUNTRIES] LOAD_COUNTRIES_DATA',
  LOAD_COUNTRIES_DATA_FAIL = '[COUNTRIES] LOAD_COUNTRIES_DATA_FAIL',
  LOAD_COUNTRIES_DATA_SUCCESS = '[COUNTRIES] LOAD_COUNTRIES_DATA_SUCCESS',
  LOAD_ALL_COUNTRIES_MISSIONS = '[COUNTRIES] LOAD_ALL_COUNTRIES_MISSIONS',
  LOAD_ALL_COUNTRIES_MISSIONS_FAIL = '[COUNTRIES] LOAD_ALL_COUNTRIES_MISSIONS_FAIL',
  LOAD_ALL_COUNTRIES_MISSIONS_SUCCESS = '[COUNTRIES] LOAD_ALL_COUNTRIES_MISSIONS_SUCCESS',
  LOAD_COUNTRIES_MISSIONS = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS',
  LOAD_COUNTRIES_MISSIONS_FAIL = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS_DATA_FAIL',
  LOAD_COUNTRIES_MISSIONS_SUCCESS = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS_SUCCESS',
  LOAD_COUNTRIES_MISSIONS_DATA = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS_DATA',
  LOAD_COUNTRIES_MISSIONS_DATA_FAIL = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS_DATA_FAIL',
  LOAD_COUNTRIES_MISSIONS_DATA_SUCCESS = '[COUNTRIES] LOAD_COUNTRIES_MISSIONS_DATA_SUCCESS'
}

export class LoadCountries implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES;
  constructor(public payload: any) {}
}

export class LoadCountriesFail implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCountriesSuccess implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCountryData implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_DATA;
  constructor() {}
}

export class LoadCountryDataFail implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadCountryDataSuccess implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadAllCountryMissions implements Action {
  readonly type = CountriesActionTypes.LOAD_ALL_COUNTRIES_MISSIONS;
  constructor() {}
}

export class LoadAllCountryMissionsFail implements Action {
  readonly type = CountriesActionTypes.LOAD_ALL_COUNTRIES_MISSIONS_FAIL;
  constructor(public payload: any) {}
}

export class LoadAllCountryMissionsSuccess implements Action {
  readonly type = CountriesActionTypes.LOAD_ALL_COUNTRIES_MISSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCountryMissions implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS;
  constructor(public payload: any) {}
}

export class LoadCountryMissionsFail implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCountryMissionsSuccess implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_SUCCESS;
  constructor(public payload: any, public id: any) {}
}

export class LoadCountryMissionsData implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA;
  constructor(public payload: {country: Country, mission_id: number}) {}
}

export class LoadCountryMissionsDataFail implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadCountryMissionsDataSuccess implements Action {
  readonly type = CountriesActionTypes.LOAD_COUNTRIES_MISSIONS_DATA_SUCCESS;
  constructor(public payload: any, public country: any) {}
}

export type CountriesActions =
  | LoadCountries
  | LoadCountriesFail
  | LoadCountriesSuccess
  | LoadCountryData
  | LoadCountryDataFail
  | LoadCountryDataSuccess
  | LoadCountryMissions
  | LoadCountryMissionsFail
  | LoadAllCountryMissions
  | LoadAllCountryMissionsFail
  | LoadAllCountryMissionsSuccess
  | LoadCountryMissionsSuccess
  | LoadCountryMissionsData
  | LoadCountryMissionsDataFail
  | LoadCountryMissionsDataSuccess;
