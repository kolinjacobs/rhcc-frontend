import { CardComponent } from './components/card/card.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
import { MaterialIconsService } from './../services/material-icons/material-icons.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatButtonToggleGroup, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { RecipeLongComponent } from './components/recipe-long/recipe-long.component';

const SHARED_MODULES = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  InfiniteScrollModule,
  ReactiveFormsModule,
  HttpModule,
  HttpClientModule,
  RouterModule,
  MatButtonToggleModule
];

const SHARED_COMPONENTS = [
  CardComponent,
  TagCloudComponent,
  RecipeComponent,
  RecipeLongComponent
];

const SHARED_PIPES = [
];

@NgModule({
  imports: [
    ...SHARED_MODULES
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MatIconRegistry,
        MaterialIconsService
      ]
    }
  }
}
