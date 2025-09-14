import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Filter, Heart, LucideAngularModule, Search } from "lucide-angular";
import { FormsModule } from '@angular/forms';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../service/animal.service';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { catchError, Observable, of, tap, finalize } from 'rxjs';

interface Filtros {
  busca: string;
  tipo: string;
  porte: string;
  sexo: string;
}

@Component({
  selector: 'app-animais',
  imports: [LucideAngularModule, FormsModule, CommonModule, AnimalCardComponent],
  templateUrl: './animais.component.html',
  styleUrl: './animais.component.css'
})
export class AnimaisComponent implements OnInit {
  // Ícones do Lucide
  readonly Heart = Heart;
  readonly Filter = Filter;
  readonly Search = Search;

  animais = signal<Animal[]>([]);
  loading = signal(true);
  filtros = signal<Filtros>({
    busca: '',
    tipo: 'todos',
    porte: 'todos',
    sexo: 'todos'
  });

  animaisFiltrados = computed(() => {
    const animals = this.animais();
    const filters = this.filtros();

    if (!animals.length) return [];

    return animals.filter(animal => {
      const matchBusca = !filters.busca || 
        animal.animalName.toLowerCase().includes(filters.busca.toLowerCase());
      
      const matchTipo = filters.tipo === 'todos' || 
        animal.animalSpecies?.toLowerCase() === filters.tipo.toLowerCase();
      
      const matchPorte = filters.porte === 'todos' || 
        animal.animalSize?.toLowerCase() === filters.porte.toLowerCase();
      
      const matchSexo = filters.sexo === 'todos' || 
        animal.animalSex.toLowerCase() === filters.sexo.toLowerCase();
      
      return matchBusca && matchTipo && matchPorte && matchSexo;
    });
  });

  totalAnimais = computed(() => this.animais().length);
  hasResultados = computed(() => this.animaisFiltrados().length > 0);


  get busca(): string { return this.filtros().busca; }
  set busca(value: string) { this.updateFiltro('busca', value); }

  get filtroTipo(): string { return this.filtros().tipo; }
  set filtroTipo(value: string) { this.updateFiltro('tipo', value); }

  get filtroPorte(): string { return this.filtros().porte; }
  set filtroPorte(value: string) { this.updateFiltro('porte', value); }

  get filtroSexo(): string { return this.filtros().sexo; }
  set filtroSexo(value: string) { this.updateFiltro('sexo', value); }

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

  private updateFiltro<K extends keyof Filtros>(key: K, value: Filtros[K]): void {
    this.filtros.update(filtros => ({ ...filtros, [key]: value }));
  }

  limparFiltros(): void {
    this.filtros.set({
      busca: '',
      tipo: 'todos',
      porte: 'todos',
      sexo: 'todos'
    });
  }
}