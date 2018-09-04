import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { MapComponent } from './containers/map/map.component';
import * as fromContainer from './containers';
import * as fromComponents from './components';
import { MissionInfoComponent } from './components/mission-info/mission-info.component';
import { CountryInfoCardComponent } from './components/country-info-card/country-info-card.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [...fromContainer.containers, ...fromComponents.components],
  declarations: [...fromContainer.containers, ...fromComponents.components]
})
export class MapModule { }
