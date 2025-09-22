import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Animal, AdocaoFormData } from "../models/animal.model";
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AnimalService {
    private apiUrl = `${environment.apiUrl}animals`;
    private http = inject(HttpClient)

    getAnimals(): Observable<Animal[]> {
        return this.http.get<{data: {content: Animal[]}}>(
            this.apiUrl
        ).pipe(
            map(response => response.data.content)
        )
    }

    getAnimal(id: string): Observable<Animal> {
        return this.http.get<Animal>(`${this.apiUrl}/${id}`);
    }

    
    enviarSolicitacaoAdocao(formData: AdocaoFormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/adocao`, formData);
    }
}