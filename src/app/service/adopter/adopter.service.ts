import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdopterResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdopterService {
  private apiUrl = `${environment.apiUrl}adopters`;
  private http = inject(HttpClient);

  private adopter?: Observable<AdopterResponse>;

  updateAdopter(id: string, data: Partial<AdopterResponse>): Observable<AdopterResponse> {
    return this.http.put<AdopterResponse>(`${this.apiUrl}/${id}`, data);
  }
}
