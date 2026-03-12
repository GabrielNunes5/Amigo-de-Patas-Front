import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, shareReplay, tap } from "rxjs";
import { Animal } from "../../models/animal.model";
import { ApiResponse } from "../../models/api-response.model";
import { environment } from '../../../environments/environment';
interface PageResponse<T> {
  content: T[];
}

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private apiUrl = `${environment.apiUrl}animals`;
  private apiUrlSorter = `${environment.apiUrl}animals?sort=createdAt,asc`;
  private http = inject(HttpClient);

  private animalsCache$?: Observable<Animal[]>;
  private animalCache = new Map<string, Observable<Animal>>();


  getAnimals(): Observable<Animal[]> {
    if (!this.animalsCache$) {
      this.animalsCache$ = this.http.get<ApiResponse<PageResponse<Animal>>>(this.apiUrlSorter).pipe(
        map(res => res.data.content),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.animalsCache$;
  }

  getAnimal(id: string): Observable<Animal> {
    if (!this.animalCache.has(id)) {
      const animal$ = this.http.get<ApiResponse<Animal>>(`${this.apiUrl}/${id}`).pipe(
        map(res => res.data),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.animalCache.set(id, animal$);
    }
    return this.animalCache.get(id)!;
  }

  createAnimal(data: Partial<Animal>): Observable<Animal> {
    return this.http.post<ApiResponse<Animal>>(this.apiUrl, data).pipe(
      map(res => res.data)
    );
  }

  updateAnimal(id: string, data: Partial<Animal>): Observable<Animal> {
    return this.http.put<ApiResponse<Animal>>(`${this.apiUrl}/${id}`, data).pipe(
      map(res => res.data)
    );
  }

  deleteAnimal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addAnimalImages(id: string, images: File[]): Observable<Animal> {
    const formData = new FormData();
    images.forEach(file => formData.append('files', file));

    return this.http.post<ApiResponse<Animal>>(`${this.apiUrl}/${id}/images`, formData).pipe(
      map(res => res.data)
    );
  }
}