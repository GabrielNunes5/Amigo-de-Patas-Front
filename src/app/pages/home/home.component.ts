import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { Animal } from '../../models/animal.model';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { AnimalService } from '../../service/animal.service';
import { catchError, of, tap, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LucideAngularModule, AnimalCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  readonly Award = Award;
  readonly Users = Users;
  readonly Home = Home;
  readonly Heart = Heart;
  readonly PawPrint = PawPrint;

  animais = signal<Animal[]>([]);
  loading = signal(true);

  animaisDestaque = computed(() => this.animais().slice(0, 3));

  estatisticas = computed(() => ({
    animaisAdotados: 500,
    familiasConectadas: 1000,
    anosAtuacao: 5,
    animaisDisponiveis: this.animais().length
  }));

  private readonly animalService = inject(AnimalService);

  ngOnInit(): void {
    this.loadAnimais();
  }

  private loadAnimais(): void {
    this.animalService.getAnimals().pipe(
      tap(data => this.animais.set(data)),
      catchError(error => {
        console.error('Erro ao carregar animais:', error);
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }
}