import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../auth/auth.guard';
import { GardenComponent } from './garden/garden.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard], 
    children:[
      {
        path:'',
        component:GardenComponent,
      },
      {
        path:'chat/:id',
        component:ChatComponent,
      } 
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class HomeRoutingModule { }
/**
 
const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [canDeactivateGuard],
            resolve: {
              crisis: crisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];
 
 
 
 



const authRoutes: Routes = [
  //{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }
]; */