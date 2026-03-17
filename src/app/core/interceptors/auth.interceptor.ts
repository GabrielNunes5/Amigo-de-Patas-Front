import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, of, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../service/auth/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (req.headers.get('X-Skip-Auth') === 'true') {
        const authReq = req.clone({ withCredentials: true });
        return next(authReq).pipe(
            catchError(() => of(null as any))
        );
    }

    const authReq = req.clone({ withCredentials: true });

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status !== 401) {
                return throwError(() => err);
            }

            if (req.url.includes('/auth/refresh')) {
                authService.logout().subscribe();
                if (!router.url.includes('/auth/')) {
                    router.navigate(['/auth/login']);
                }
                return throwError(() => err);
            }

            return authService.refresh().pipe(
                switchMap(() => {
                    const retryReq = req.clone({ withCredentials: true });
                    return next(retryReq);
                }),
                catchError(() => {
                    authService.logout().subscribe();
                    if (!router.url.includes('/auth/')) {
                        router.navigate(['/auth/login']);
                    }
                    return throwError(() => err);
                })
            );
        })
    );
};