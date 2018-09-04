import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { MapModule } from './modules/map/map.module';
import {ApiService} from './services/api-service/api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    MapModule,
    // Instrumentation must be imported after importing StoreModule
    StoreDevtoolsModule.instrument()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
