import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ChatViewComponent } from './chat/chat-view/chat-view.component';
import { GardenViewComponent } from './garden-view/garden-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { authGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  //{ path: 'chat', component: ChatViewComponent },
  { path: 'garden', component: GardenViewComponent, canActivate: [authGuard] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
/**
  { path: '',   redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
 * const adminRoutes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard],

  children: [{
    path: '',
    children: [
      {path: 'crises', component: ManageCrisesComponent},
      {path: 'heroes', component: ManageHeroesComponent},
      {path: '', component: AdminDashboardComponent}
    ],
  }]  {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
}]; */

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
