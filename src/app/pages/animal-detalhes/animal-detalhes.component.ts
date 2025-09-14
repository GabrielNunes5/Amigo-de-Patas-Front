import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  ArrowLeft, 
  Heart, 
  Calendar, 
  User, 
  Scale, 
  CheckCircle, 
  Palette,
  Syringe,
  AlertTriangle
} from 'lucide-angular';
import { catchError, switchMap } from 'rxjs/operators';
import { AnimalService } from '../../service/animal.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { AdoptionFormComponent } from '../../components/adoption-form/adoption-form.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-animal-detalhes',
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterLink,
    AdoptionFormComponent
  ],
  templateUrl: './animal-detalhes.component.html',
  styleUrl: './animal-detalhes.component.css'
})
export class AnimalDetalhesComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly Heart = Heart;
  readonly Calendar = Calendar;
  readonly User = User;
  readonly Scale = Scale;
  readonly CheckCircle = CheckCircle;
  readonly Palette = Palette;
  readonly Syringe = Syringe;
  readonly AlertTriangle = AlertTriangle;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly animalService = inject(AnimalService);

  showForm = signal(false);
  submitted = signal(false);

  canShowAdoptionButton = computed(() => !this.showForm() && !this.submitted());

  animal = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/animais'])
          return of(null);
        }
        return this.animalService.getAnimal(id).pipe(
          catchError(err => {
            console.error('Erro ao carregar animal', err);
            this.router.navigate(['/animais'])
            return of(null);
          })
        );
      })
    ),
    { initialValue: null }
  );

  mostrarFormulario(): void {
    this.showForm.set(true);
  }

  onFormCancelled(): void {
    this.showForm.set(false);
  }

  onFormSubmitted(): void {
    this.submitted.set(true);
    this.showForm.set(false);
  }
  
  speciesBadgeClasses = computed(() => {
    const species = this.animal()?.animalSpecies;

    const baseClasses = 'inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full border';

    switch(species){
      case "Cachorro" : return `${baseClasses} bg-blue-100 text-blue-700 border-blue-200`;
      case "Gato" : return `${baseClasses} bg-purple-100 text-purple-700 border-purple-200`;
      default : return `${baseClasses} bg-gray-100 text-gray-700 border-gray-200`;
    }
  })
  
  specieEmoji = computed(() => {
    const species = this.animal()?.animalSpecies;
    switch(species){
      case "Cachorro" : return '🐕';
      case "Gato" : return '🐱';
      default : return '🐾';
    }
  })

  neutredText = computed(() => {
    const neutred = this.animal()?.animalNeutered;
    return neutred 
    ? 'Castrado' 
    : 'Não castrado';
  })

  neuteredClasses = computed(() => {
    const neutred = this.animal()?.animalNeutered;
    return neutred 
    ? 'w-5 h-5 text-green-500' 
    : 'w-5 h-5 text-yellow-500';
  })

  neutredTextClasses = computed(() =>{
    const neutred = this.animal()?.animalNeutered;
    return neutred 
    ? 'text-sm font-medium text-green-700' 
    : 'text-sm font-medium text-yellow-700'
  })
  
}