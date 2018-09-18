import { MapDataEffects } from './map-data/map-data.effects';
import { CountriesEffects } from './countries/countries.effects';
import { ApplicationEffects } from './application/application.effects';

export const effects: Array<any> = [MapDataEffects, CountriesEffects, ApplicationEffects];

export * from './map-data/map-data.effects';
export * from './countries/countries.effects';
export * from './application/application.effects';
