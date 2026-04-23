import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';


export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if(auth.user()) {
    return auth.isAdmin() ? true : router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/auth/login']);
};
