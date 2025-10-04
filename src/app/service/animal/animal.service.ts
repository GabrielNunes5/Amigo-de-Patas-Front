import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";
import { Animal, AdocaoFormData } from "../../models/animal.model";
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private apiUrl = `${environment.apiUrl}animals`;
  private http = inject(HttpClient);

  private animalsCache$?: Observable<Animal[]>;

  private animalCache = new Map<string, Observable<Animal>>();

  getAnimals(): Observable<Animal[]> {
    if (!this.animalsCache$) {
      this.animalsCache$ = this.http.get<{ data: { content: Animal[] } }>(this.apiUrl).pipe(
        map(response => response.data.content),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.animalsCache$;
  }

  getAnimal(id: string): Observable<Animal> {
    if (!this.animalCache.has(id)) {
      const animal$ = this.http.get<{ data: Animal }>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.data),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.animalCache.set(id, animal$);
    }
    return this.animalCache.get(id)!;
  }

  enviarSolicitacaoAdocao(formData: AdocaoFormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/adocao`, formData);
  }
}
