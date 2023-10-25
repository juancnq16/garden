import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
  //{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }
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