import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, map, of } from 'rxjs';
import { AdopterResponse, LoginRequest, RegisterRequest } from '../../models/auth.model';
import { ApiResponse } from '../../models/api-response.model';

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

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, data
    );
  }
  
  login(data: LoginRequest): Observable<AdopterResponse> {
    return this.http.post<void>(`${this.apiUrl}/login`, data
    ).pipe(
      switchMap(() => this.profile())
    );
  }

  profile(): Observable<AdopterResponse> {
    if (this.currentUser() !== null) {
      return of(this.currentUser()!);
    }

    return this.http.get<ApiResponse<AdopterResponse>>(`${this.apiUrl}/me` 
    ).pipe(
      map(res => res.data),
      tap(user => this.currentUser.set(user))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}
    ).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }

  refresh(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/refresh`, {}
    )
  }

  forgotPassword(adopterEmail: string): Observable<void> {
    console.log('forgotPassword chamado', adopterEmail);
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { adopterEmail });
  }

  resetPassword(adopterPassword: string, adopterConfirmPassword: string, resetToken: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password?resetToken=${resetToken}`, { adopterPassword, adopterConfirmPassword });
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role?.includes('ADMIN') ?? false;
  }

  loadUserProfile(): void {
    this.http.get<ApiResponse<AdopterResponse>>(`${this.apiUrl}/me`, {
        headers: { 'X-Skip-Auth': 'true' }
    }).pipe(
        map(res => res.data),
        tap(user => this.currentUser.set(user))
    ).subscribe({
        error: () => this.currentUser.set(null)
    });
  }
}
