import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxTranslateModule } from './translate/translate.module';
import { httpInterceptorProviders } from './services/interceptor';
import { HomeModule } from './home/home.module';
import { MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    NgxTranslateModule,
    HomeModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    router: Router
  ) {
  }
}

/**
 * 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    AuthModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
 */