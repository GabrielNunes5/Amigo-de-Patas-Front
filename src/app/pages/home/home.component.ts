import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { Animal } from '../../models/animal.model';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { AnimalService } from '../../service/animal.service';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LucideAngularModule, AnimalCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  readonly Award = Award;
  readonly Users = Users;
  readonly Home = Home
  readonly Heart = Heart;
  readonly PawPrint = PawPrint

  animais: Animal[] = [];
  animais$!: Observable<Animal[]>;
  loading$ = new BehaviorSubject(true);
  animalService = inject(AnimalService);
  

  ngOnInit(): void {
      this.animais$ = this.animalService.getAnimals().pipe(
        tap(data =>{
          this.animais = data
          this.loading$.next(false);
        }),
        catchError(err => {
          console.error('Erro ao buscar animais', err);~
          this.loading$.next(false);
          return of([]);
        })
      )
    }

}
