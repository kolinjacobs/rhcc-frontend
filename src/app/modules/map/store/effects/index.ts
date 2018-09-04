import { MapDataEffects } from './map-data/map-data.effects';
import { CountriesEffects } from './countries/countries.effects';

export const effects: Array<any> = [MapDataEffects, CountriesEffects];

export * from './map-data/map-data.effects';
export * from './countries/countries.effects';
