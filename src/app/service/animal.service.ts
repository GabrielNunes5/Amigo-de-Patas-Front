import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Animal, AdocaoFormData } from "../models/animal.model";

@Injectable({providedIn: 'root'})
export class AnimalService {
    private apiUrl = 'http://localhost:3000/animals';
    private http = inject(HttpClient)

    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.apiUrl);
    }

    getAnimal(id: string ): Observable<Animal> {
        return this.http.get<Animal>(`${this.apiUrl}/${id}`);
    }
    
    enviarSolicitacaoAdocao(formData: AdocaoFormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/adocao`, formData);
    }
}