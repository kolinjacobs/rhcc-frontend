import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  EXTEND_IDLE_TIME = '[Application] Extend the idle timer.',
  IDLE = '[Application] IDLE',
  NOT_IDLE = '[Application] NOT_IDLE',
  PAGE_REFRESH_TIME = '[Application] Page refresh',
  NEED_REFRESH = '[Application] Page refresh',
}

export class ExtendIdleTime implements Action {
  readonly type = ApplicationActionTypes.EXTEND_IDLE_TIME;
  constructor() {}
}
export class Idle implements Action {
  readonly type = ApplicationActionTypes.IDLE;
}
export class NotIdle implements Action {
  readonly type = ApplicationActionTypes.NOT_IDLE;
}
export class PageRefresh implements Action {
  readonly type = ApplicationActionTypes.PAGE_REFRESH_TIME;
  constructor(public payload: boolean) {}
}
export class NeedRefresh implements Action {
  readonly type = ApplicationActionTypes.NEED_REFRESH;
  constructor(public payload: boolean) {}
}

export type ApplicationActions =
  | ExtendIdleTime
  | Idle
  | NotIdle
  | PageRefresh
  | NeedRefresh;
