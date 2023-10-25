import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChatComponent } from './chat/chat.component';
import { GardenComponent } from './garden/garden.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    GardenComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class HomeModule { }
