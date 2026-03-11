import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../service/auth/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const authReq = req.clone({
        withCredentials: true
    });

    return next(authReq).pipe(
        tap(() => {
            console.log('Request successful:', authReq.url);
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.status !== 401) {
                return throwError(() => err);
            }

            if (req.url.includes('/auth/refresh')) {
                authService.logout().subscribe();
                router.navigate(['/auth/login']);
                return throwError(() => err);
            }

            return authService.refresh().pipe(
                switchMap(() => {
                    const retryReq = req.clone({
                        withCredentials: true
                    });
                    return next(retryReq);
                }),
                catchError(() => {
                    authService.logout().subscribe();
                    router.navigate(['/auth/login']);
                    return throwError(() => err);
                })
            );
        })
    );
};
