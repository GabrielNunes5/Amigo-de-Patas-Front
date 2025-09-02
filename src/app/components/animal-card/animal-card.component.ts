import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar, Heart, LucideAngularModule, Ruler, User } from 'lucide-angular';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animal-card',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css'
})
export class AnimalCardComponent {
  @Input() animal!: Animal;

  tipoColors: Record<string, string> = {
    cachorro: 'bg-blue-100 text-blue-700 border-blue-200',
    gato: 'bg-purple-100 text-purple-700 border-purple-200'
  }

  porteColors: Record<string, string> = {
    pequeno: 'bg-green-100 text-green-700 border-green-200',
    médio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    grande: 'bg-orange-100 text-orange-700 border-orange-200'
  }

  readonly Heart = Heart;
  readonly Calendar = Calendar;
  readonly User = User;
  readonly Ruler = Ruler
}
