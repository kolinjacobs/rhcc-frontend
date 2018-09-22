import * as fromApplication from '../../actions/application/application.actions';

export interface ApplicationState {
  isIdle: boolean;
  needsRefresh: boolean;
}

const initialState: ApplicationState = {
  isIdle: false,
  needsRefresh: false
};

export const getIdleState = (state: ApplicationState) => {
  return state && state.isIdle;
};

export const getRefreshState = (state: ApplicationState) => {
  return state && state.needsRefresh;
};

export function reducer(state = initialState, action: fromApplication.ApplicationActions): ApplicationState {
  switch (action.type) {
    case fromApplication.ApplicationActionTypes.IDLE: {
      return {
        ...state,
        isIdle: true
      };
    }

    case fromApplication.ApplicationActionTypes.NOT_IDLE: {
      return {
        ...state,
        isIdle: false
      };
    }

    case fromApplication.ApplicationActionTypes.NEED_REFRESH: {
      return {
        ...state,
        needsRefresh: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
