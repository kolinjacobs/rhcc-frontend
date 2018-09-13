import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import * as fromContainer from './containers';
import * as fromComponents from './components';
import { SafeHtmlPipe } from '../../pipes/safeHtml/safe-html.pipe';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    MalihuScrollbarModule.forRoot(),
    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [...fromContainer.containers, ...fromComponents.components],
  declarations: [
    SafeHtmlPipe,
    ...fromContainer.containers,
    ...fromComponents.components,
  ]
})
export class MapModule { }
