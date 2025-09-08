import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Animal } from "../models/animal.model";

@Injectable({providedIn: 'root'})
export class AnimalService {
    private apiUrl = 'http://localhost:3000/animals';
    private http = inject(HttpClient)

    getAnimals(): Observable<Animal[]> {
        return this.http.get<Animal[]>(this.apiUrl);
    }
}