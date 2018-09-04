import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AVAILABLE_SERVICES } from '../../../../../services/api-service/configs/api.config';
import * as fromMapData from '../../actions/map-data/map-data.actions';
import { ApiService } from '../../../../../services/api-service/api.service';
import * as mapData from '../../../../../services/data/data.json';

@Injectable()
export class MapDataEffects {
    @Effect()
    loadPermissions$ = this.actions$
        .ofType(fromMapData.MapActionTypes.LOAD_MAP_DATA)
        .pipe(map(x => new fromMapData.LoadMapDataSuccess(mapData)));

    constructor(private actions$: Actions, private service: ApiService) {}
}
