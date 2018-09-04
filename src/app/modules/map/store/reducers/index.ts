import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMaps from './map-data/map-data.reducer';
import * as fromCountries from './countries/countries.reducer';

export interface SharedState {
  mapData: fromMaps.MapState;
  countries: fromCountries.CountriesState;
}

export const reducers: ActionReducerMap<SharedState> = {
  mapData: fromMaps.reducer,
  countries: fromCountries.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('map');
