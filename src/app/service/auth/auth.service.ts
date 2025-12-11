import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, map } from 'rxjs';
import { AdopterResponse, AuthResponse, JwtPayload, LoginRequest, RegisterRequest } from '../../models/auth.model';
import { jwtDecode } from "jwt-decode"

interface ApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}auth`;
    private http = inject(HttpClient);

    private currentUser = signal<AdopterResponse | null>(null);

    get user() {
      return this.currentUser.asReadonly();
    }

    private pickRole(token: string): string[] {
      try{
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.scope || [];
      }catch {
        return []
      }
    }

    register(data: RegisterRequest): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
      }));
    }
    
    login(data: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
        .pipe(
          tap((response) => {
            localStorage.setItem('accessToken', response.accessToken);

            const roles = this.pickRole(response.accessToken);
            localStorage.setItem('roles', JSON.stringify(roles))
          }),
          switchMap((authResponse) => 
            this.profile().pipe(
              tap((user) => {
                this.currentUser.set(user);
              }),
              map(() => authResponse)
            )
          )
        );
    }

    profile(): Observable<AdopterResponse> {
      return this.http.get<ApiResponse<AdopterResponse>>(`${this.apiUrl}/me`)
        .pipe(
          map(response => response.data),
          tap({
            next: (user) => {;
              this.currentUser.set(user);
            },
            error: (error) => {
              console.error('Erro ao buscar profile:', error);
            }
          })
        );
    }

    logout(): void {
      localStorage.clear();
      this.currentUser.set(null);
  }

    isAuthenticated(): boolean {
      return !!localStorage.getItem('accessToken');
  }

    isAdmin(): boolean {
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      return roles.includes('ADMIN');
    }

  loadUserProfile(): void {
    if (this.isAuthenticated()) {
      this.profile().subscribe();
    }
  }
}
