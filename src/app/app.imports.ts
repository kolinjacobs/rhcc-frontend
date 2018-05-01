
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { RecipesEffects } from './store/effects/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { initialState } from './models/state.model';
import { appReducer } from './store/reducers/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const APP_IMPORTS = [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true }),
  EffectsModule.forRoot([
    RecipesEffects
  ]),
  StoreModule.forRoot(<any>{ app: appReducer }, { initialState }),
  // Instrumentation must be imported after importing StoreModule (config is optional)
  StoreDevtoolsModule.instrument(),
  StoreRouterConnectingModule
];
