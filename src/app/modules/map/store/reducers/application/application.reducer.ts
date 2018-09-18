import * as fromApplication from '../../actions/application/application.actions';

export interface ApplicationState {
  isIdle: boolean;
}

const initialState: ApplicationState = {
  isIdle: false
};

export const getIdleState = (state: ApplicationState) => {
  return state && state.isIdle;
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

    default: {
      return state;
    }
  }
}
