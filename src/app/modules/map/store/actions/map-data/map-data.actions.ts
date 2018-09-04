import { Action } from '@ngrx/store';

export enum MapActionTypes {
    LOAD_MAP_DATA = '[MAP] LOAD_MAP_DATA',
    LOAD_MAP_DATA_FAIL = '[MAP] LOAD_MAP_DATA_FAIL',
    LOAD_MAP_DATA_SUCCESS = '[MAP] LOAD_MAP_DATA_SUCCESS',
}

export class LoadMapData implements Action {
    readonly type = MapActionTypes.LOAD_MAP_DATA;
    constructor(public payload: any) {}
}

export class LoadMapDataFail implements Action {
    readonly type = MapActionTypes.LOAD_MAP_DATA_FAIL;
    constructor(public payload: any) {}
}

export class LoadMapDataSuccess implements Action {
    readonly type = MapActionTypes.LOAD_MAP_DATA_SUCCESS;
    constructor(public payload: any) {}
}

export type MapActions =
    | LoadMapData
    | LoadMapDataFail
    | LoadMapDataSuccess;
