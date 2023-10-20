import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';

const authRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}