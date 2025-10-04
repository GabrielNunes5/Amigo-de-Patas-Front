import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { Animal } from '../../models/animal.model';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { AnimalService } from '../../service/animal/animal.service';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LucideAngularModule, AnimalCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly Award = Award;
  readonly Users = Users;
  readonly Home = Home;
  readonly Heart = Heart;
  readonly PawPrint = PawPrint;

  private readonly animalService = inject(AnimalService);

  private readonly animaisResponse = toSignal(
    this.animalService.getAnimals().pipe(
      catchError(error => {
        console.error('Erro ao carregar animais:', error);
        return of([]);
      })
    ),
    { initialValue: [] as Animal[] }
  );

  loading = computed(() => !this.animaisResponse());

  animais = computed(() => this.animaisResponse());

  animaisDestaque = computed(() => this.animais().slice(0, 3));

  estatisticas = computed(() => ({
    animaisAdotados: 500,
    familiasConectadas: 1000,
    anosAtuacao: 5,
    animaisDisponiveis: this.animais().length
  }));
}