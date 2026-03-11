import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if(auth.user() !== null) {
    return auth.isAdmin() ? true : router.createUrlTree(['/']);
  }

  return auth.profile().pipe(
    map(user => {
      if (user?.role?.includes('ADMIN')) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/']));
    })
  );
};
