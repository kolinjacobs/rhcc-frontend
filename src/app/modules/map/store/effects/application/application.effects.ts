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
  // APPLICATION_TIMEOUT_TIME = 1000 * 10;

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

  constructor( private actions$: Actions ) {}
}
