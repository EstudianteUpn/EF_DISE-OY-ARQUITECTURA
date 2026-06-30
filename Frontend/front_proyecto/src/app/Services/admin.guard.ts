import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './AuthService';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.isLoggedIn() && ['ADMIN', 'TRABAJADOR'].includes(auth.getRol() ?? '')) {
    return true;
  }
  inject(Router).navigate(['/login']);
  return false;
};