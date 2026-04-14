import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.user()) {
    return true;
  }

  return auth.profile().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/auth/login'])))
  );
};