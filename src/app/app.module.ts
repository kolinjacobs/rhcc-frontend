import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker'
import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { environment } from '../environments/environment';

import { BASE_URL, ContentaServiceModule } from 'contenta-angular-service';
import { APP_IMPORTS } from './app.imports';
import { APP_DECLARATIONS } from './app.declarations';
import { APP_PROVIDERS } from './app.providers';

@NgModule({
  declarations: [
    APP_DECLARATIONS,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContentaServiceModule,
    SharedModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    APP_IMPORTS
  ],
  providers: [
    APP_PROVIDERS,
    {
      provide: BASE_URL,
      useValue: environment.jsonapi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
