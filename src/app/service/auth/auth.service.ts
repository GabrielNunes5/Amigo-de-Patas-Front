import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AdopterResponse, AuthResponse, LoginRequest, RegisterRequest } from '../../models/auth.model';

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

    register(data: RegisterRequest): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => {
        localStorage.setItem('acessToken', response.accessToken);
      }));
    }
    
    login(data: LoginRequest): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap((response) => {
        console.log('Resposta do servidor:', response);
        localStorage.setItem('acessToken', response.accessToken);
      }));
    }

    profile(): Observable<AdopterResponse>{
      return this.http.get<AdopterResponse>(`${this.apiUrl}/me`);
    }

    logout(): void {
      localStorage.removeItem('acessToken');
      this.currentUser.set(null);
  }

    isAuthenticated(): boolean {
      return !!localStorage.getItem('acessToken');
  }
}
