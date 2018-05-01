import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { MapHomeComponent } from './components/map-home/map-home.component';

export const routes = [
  { path: '', component: MapHomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapHomeComponent]
})
export class MapHomeModule { }
