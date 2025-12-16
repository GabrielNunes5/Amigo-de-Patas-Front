import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (roles.includes('ADMIN')){
    return true
  }

  return router.createUrlTree(['/home'])
};
