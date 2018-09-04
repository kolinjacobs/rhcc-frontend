import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../reducers';
import * as fromMapData from '../../reducers/map-data/map-data.reducer';

export const getMapDataState = createSelector(
    fromFeature.getSharedState, (state: fromFeature.SharedState) => state && state.mapData);

export const getMapDataLoaded = createSelector(getMapDataState, fromMapData.getMapDataLoading);

export const getAllMapData = createSelector(getMapDataState, fromMapData.getMapData);
