import { HttpInterceptorFn } from "@angular/common/http";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const acessToken = localStorage.getItem("acessToken");

    if (acessToken) {
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${acessToken}` }
        });
        return next(authReq);
    }

    return next(req);
}