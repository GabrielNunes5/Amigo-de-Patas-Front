import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, map } from 'rxjs';
import { AdopterResponse, LoginRequest, RegisterRequest } from '../../models/auth.model';

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

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, data,
      { withCredentials: true }
    );
  }
  
  login(data: LoginRequest): Observable<AdopterResponse> {
    return this.http.post<void>(`${this.apiUrl}/login`, data,
      { withCredentials: true }
    ).pipe(
      switchMap(() => this.profile())
    );
  }

  profile(): Observable<AdopterResponse> {
    return this.http.get<ApiResponse<AdopterResponse>>(`${this.apiUrl}/me`,
      { withCredentials: true }
    ).pipe(
      map(res => res.data),
      tap(user => this.currentUser.set(user))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.roles?.includes('ADMIN') ?? false;
  }

  loadUserProfile(): void {
    this.profile().subscribe({
      error: () => {
        this.currentUser.set(null);
      }
    });
  }
}
