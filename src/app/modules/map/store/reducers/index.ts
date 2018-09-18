import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMaps from './map-data/map-data.reducer';
import * as fromCountries from './countries/countries.reducer';
import * as fromApplication from './application/application.reducer';

export interface SharedState {
  mapData: fromMaps.MapState;
  countries: fromCountries.CountriesState;
  application: fromApplication.ApplicationState;
}

export const reducers: ActionReducerMap<SharedState> = {
  mapData: fromMaps.reducer,
  countries: fromCountries.reducer,
  application: fromApplication.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('map');
