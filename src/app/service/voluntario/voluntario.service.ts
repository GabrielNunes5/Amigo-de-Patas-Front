import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Voluntary } from '../../models/voluntary.model';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  private apiUrl = `${environment.apiUrl}voluntary`;
  private http = inject(HttpClient);

  private voluntaryCache$?: Observable<Voluntary[]>;

  getVoluntaries(): Observable<Voluntary[]> {
    if (!this.voluntaryCache$){
      this.voluntaryCache$ = this.http.get<{ data: { content: Voluntary[] } }>(this.apiUrl).pipe(
        map(response => response.data.content),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.voluntaryCache$;
  }

  createVoluntary(
    data: Partial<Voluntary>): Observable<Voluntary> {
      return this.http.post<Voluntary>(this.apiUrl, data);
    }
}
