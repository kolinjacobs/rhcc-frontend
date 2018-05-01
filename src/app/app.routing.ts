/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { FeaturesComponent } from './components/features/features.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'features', component: FeaturesComponent },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'missions', loadChildren: './map/map-home.module#MapHomeModule' }
];
