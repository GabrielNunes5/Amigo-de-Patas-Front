import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdocaoFormData } from '../../models/animal.model';
import { ApiResponse, PageResponse } from '../../models/api-response.model';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionFormService {
  private apiUrl = `${environment.apiUrl}adoption-form`;
  private http = inject(HttpClient);
  private adoptionFormsCache$?: Observable<AdocaoFormData[]>;

  getAdoptionForms(): Observable<AdocaoFormData[]> {
    if (!this.adoptionFormsCache$) {
      this.adoptionFormsCache$ = this.http.get<ApiResponse<PageResponse<AdocaoFormData>>>(this.apiUrl).pipe(
        map(res => res.data.content),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.adoptionFormsCache$;
  }

  createAdoptionForm(data: Partial<AdocaoFormData>): Observable<AdocaoFormData> {
    return this.http.post<ApiResponse<AdocaoFormData>>(this.apiUrl, data).pipe(
      map(res => res.data)
    );
  }

  updateAdoptionForm(id: string, status: string): Observable<AdocaoFormData> {
    return this.http.patch<ApiResponse<AdocaoFormData>>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      map(res => res.data)
    )
  }

  deleteAdoptionForm(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}