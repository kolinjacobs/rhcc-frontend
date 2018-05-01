import { Backend } from './services/backend.service';
import { RecipesEffects } from './store/effects/effects';
import { ContentaDatastore } from 'contenta-angular-service';

export const APP_PROVIDERS = [
  Backend,
  RecipesEffects,
  ContentaDatastore,
];
