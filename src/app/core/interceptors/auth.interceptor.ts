import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../../service/auth/auth.service";
import { inject } from "@angular/core";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const token = localStorage.getItem('accessToken');

    let authReq = req;

    if (token) {
        if (req.body instanceof FormData) {
        authReq = req.clone({
            setHeaders: {
            Authorization: `Bearer ${token}`,
            },
        });
        } else {
        authReq = req.clone({
            setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        }
    }

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
            authService.logout();
            router.navigate(['/auth/login']);
        }
        return throwError(() => err);
        })
    );
};
