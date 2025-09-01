import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Award, Heart, Home, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
interface Animal {
  id: number;
  nome: string;
  foto: string;
}
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LucideAngularModule],
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
      this.animalDestaque = [
        { id: 1, nome: 'Rex', foto: 'https://fisioanimal.com/blog/wp-content/uploads/2019/06/Filhote-Cachorro-900x628.jpg' },
        { id: 1, nome: 'Rex', foto: 'https://www.portaldodog.com.br/wp-content/uploads/2024/09/4-curiosidades-sobre-racas-de-cachorros-pequenos.jpg' },
        { id: 1, nome: 'Mia', foto: 'https://blog.vetzco.com.br/wp-content/uploads/2024/12/151-Quantos-anos-vive-um-gato.webp' },
      ];
      this.loading = false;
    }, 1000)
  }
}
