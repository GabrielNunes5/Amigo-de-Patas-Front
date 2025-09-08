import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { Animal } from '../../models/animal.model';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { AnimalService } from '../../service/animal.service';
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

  animalService = inject(AnimalService)

  animals: Animal[] = [];
  loading = true;
  

  ngOnInit(): void{
    this.animalService.getAnimals().subscribe({
      next: (data) =>{
        this.animals = data;
        this.loading = false;
      },
      error: (error) =>{
        console.error('Error fetching animals:', error);
        this.loading = true;
      }
    })
  }

}
