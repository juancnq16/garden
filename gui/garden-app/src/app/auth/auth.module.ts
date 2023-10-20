
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class AuthModule {}
