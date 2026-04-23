import { firstValueFrom } from "rxjs";
import { AuthService } from "../../service/auth/auth.service";

export function initAuth(authService: AuthService) {
    return () => {
        return firstValueFrom(
            authService.profile()
        ).then(() => {
            console.log('Auth initialized', authService.user());
        }).catch(() => {
            return Promise.resolve();
        })
    }
}