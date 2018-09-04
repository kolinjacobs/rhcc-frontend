import * as fromActions from '../../actions/map-data/map-data.actions';
import { Store } from '@ngrx/store';

export interface MapState {
    data: any;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const initialState: MapState = {
    data: null,
    loaded: false,
    loading: true,
    error: undefined
};

export const getMapData = (state: MapState) => {
    return state && state.data;
};

export const getMapDataLoading = (state: MapState) => state && state.loaded;

export function reducer(
    state = initialState,
    action: fromActions.MapActions
): MapState {
    switch (action.type) {
        case fromActions.MapActionTypes.LOAD_MAP_DATA: {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        case fromActions.MapActionTypes.LOAD_MAP_DATA_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload
            };
        }

        case fromActions.MapActionTypes.LOAD_MAP_DATA_SUCCESS: {
            const mapData = action.payload;
            return {
                ...state,
                loaded: true,
                loading: false,
                data: mapData
            };
        }

        default:
            return state;
    }
}
