import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../reducers';
import * as fromApplication from '../../reducers/application/application.reducer';

export const getApplicationState = createSelector(
  fromFeature.getSharedState, (state: fromFeature.SharedState) => state && state.application);

export const selectIsIdle = createSelector(getApplicationState, fromApplication.getIdleState);
export const selectRefresh = createSelector(getApplicationState, fromApplication.getRefreshState);
