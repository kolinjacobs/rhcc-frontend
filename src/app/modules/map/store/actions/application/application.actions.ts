import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  EXTEND_IDLE_TIME = '[Application] Extend the idle timer.',
  IDLE = '[Application] IDLE',
  NOT_IDLE = '[Application] NOT_IDLE'
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

export type ApplicationActions =
  | ExtendIdleTime
  | Idle
  | NotIdle;
