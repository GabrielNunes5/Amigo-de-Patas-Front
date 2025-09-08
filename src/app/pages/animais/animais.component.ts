import { Component, inject, OnInit } from '@angular/core';
import { Filter, Heart, LucideAngularModule, Search } from "lucide-angular";
import { FormsModule } from '@angular/forms';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../service/animal.service';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';

@Component({
  selector: 'app-animais',
  imports: [LucideAngularModule, FormsModule, CommonModule, AnimalCardComponent],
  templateUrl: './animais.component.html',
  styleUrl: './animais.component.css'
})
export class AnimaisComponent implements OnInit {
  readonly Heart = Heart;
  readonly Filter = Filter;
  readonly Search = Search;

  animais: Animal[] = [];
  animaisFiltrados: Animal[] = [];
  loading = true;
  animalService = inject(AnimalService)

  // Filtros
  busca: string = '';
  filtroTipo: string = 'todos';
  filtroPorte: string = 'todos';
  filtroSexo: string = 'todos';

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animais = data;
        this.animaisFiltrados = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar animais', err);
        this.loading = false;
      }
    });
  }

  filtrarAnimais(): void {
    this.animaisFiltrados = this.animais.filter(animal => {
      const matchBusca = this.busca
        ? animal.animalName.toLowerCase().includes(this.busca.toLowerCase())
        : true;
      const matchTipo = this.filtroTipo !== 'todos'
        ? animal.animalSpecies?.toLowerCase() === this.filtroTipo.toLowerCase()
        : true;
      const matchPorte = this.filtroPorte !== 'todos'
        ? animal.animalSize?.toLowerCase() === this.filtroPorte.toLowerCase()
        : true;
      const matchSexo = this.filtroSexo !== 'todos'
        ? animal.animalSex.toLowerCase() === this.filtroSexo.toLowerCase()
        : true;

      return matchBusca && matchTipo && matchPorte && matchSexo;
    });
  }

limparFiltros(): void {
    this.busca = '';
    this.filtroTipo = 'todos';
    this.filtroPorte = 'todos';
    this.filtroSexo = 'todos';
    this.animaisFiltrados = [...this.animais];
  }
}
