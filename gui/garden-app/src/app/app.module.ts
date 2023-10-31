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
import { StompService } from './services/stomp.service';
import { rxStompServiceFactory } from './config/stompFactory';

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
  providers: [{
        provide: StompService,
        useFactory: rxStompServiceFactory,
      },
      httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    router: Router
  ) {
  }
}