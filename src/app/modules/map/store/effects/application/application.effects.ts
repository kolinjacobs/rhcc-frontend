import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromApplication from '../../actions/application/application.actions';
import { Observable, of, timer } from 'rxjs/index';

@Injectable()
export class ApplicationEffects {

  // 3 minute timeout
  APPLICATION_TIMEOUT_TIME = (1000 * 60) * 2;
  // Hour refresh timeout
  PAGE_REFRESH_TIMEOUT = (1000 * 60) * 60;
  // PAGE_REFRESH_TIMEOUT = (1000 * 20);

  @Effect()
  extendApplicationTimeout$ = this.actions$
    .ofType(fromApplication.ApplicationActionTypes.EXTEND_IDLE_TIME)
    .pipe(
      switchMap( ( action: Action ) => {
        return timer(this.APPLICATION_TIMEOUT_TIME);
      }),
      map(() => {
        return new fromApplication.Idle();
      })
    );

  @Effect()
  reloadPageTimeoutTimeout$ = this.actions$
    .ofType(fromApplication.ApplicationActionTypes.PAGE_REFRESH_TIME)
    .pipe(
      switchMap( ( action: Action ) => {
        return timer(this.PAGE_REFRESH_TIMEOUT);
      }),
      map(() => {
        return new fromApplication.NeedRefresh(true);
      })
    );

  constructor( private actions$: Actions ) {}
}
