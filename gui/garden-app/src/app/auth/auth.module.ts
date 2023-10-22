
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { LanSelectorComponent } from '../translate/lan-selector/lan-selector.component';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatCardModule,
    NgxTranslateModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent
  ]
})
export class AuthModule {}
