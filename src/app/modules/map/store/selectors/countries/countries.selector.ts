import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../reducers';
import * as fromCountries from '../../reducers/countries/countries.reducer';

export const getCountriestate = createSelector(
  fromFeature.getSharedState, (state: fromFeature.SharedState) => state && state.countries);

export const getCountriesLoaded = createSelector(getCountriestate, fromCountries.getCountriesLoading);
export const getCountries = createSelector(getCountriestate, fromCountries.getCountries);

export const getAllCountriesMissionsLoaded = createSelector(getCountriestate, fromCountries.getAllCountriesLoaded);
