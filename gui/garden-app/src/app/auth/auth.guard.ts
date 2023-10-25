import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { StorageService } from '../services/storage.service';
/*
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
*/
export const authGuard = () => {
  //console.log('authGuard#canActivate called');
  const authService = inject(AuthService);
  const router = inject(Router);
  const storageService = inject(StorageService)

  if (storageService.isLoggedIn()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};