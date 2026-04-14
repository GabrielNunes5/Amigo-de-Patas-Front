import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.user()) {
    return router.createUrlTree(['/']);
  }

  return auth.profile().pipe(
    map(() => router.createUrlTree(['/'])),
    catchError(() => of(true))
  );
};
