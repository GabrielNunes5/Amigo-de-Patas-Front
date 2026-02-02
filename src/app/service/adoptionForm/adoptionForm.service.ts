import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdocaoFormData } from '../../models/animal.model';
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
      this.adoptionFormsCache$ = this.http.get<{ data: { content: AdocaoFormData[] } }>(this.apiUrl).pipe(
        map(response => response.data.content),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.adoptionFormsCache$;
  }

  createAdoptionForm(
    data: Partial<AdocaoFormData>): Observable<AdocaoFormData> {
      return this.http.post<AdocaoFormData>(this.apiUrl, data);
    }
}
