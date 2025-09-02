import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { MOCK_ANIMALS } from '../../mocks/mock-animals';
import { Animal } from '../../models/animal.model';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
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
  animalDestaque: Animal[] = [];
  loading = true;

  ngOnInit(): void{
    this.loadAnimaisDestaque();
  }

  loadAnimaisDestaque(): void {
    setTimeout(() => {
      this.animalDestaque = MOCK_ANIMALS
      this.loading = false;
    }, 1000)
  }
}
