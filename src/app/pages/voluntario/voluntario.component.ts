import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArrowLeft, Building2, Camera, Car, CheckCircle, CircleAlert, Clock, Heart, LucideAngularModule, Megaphone, Star, Stethoscope, User, Users } from 'lucide-angular';
import { NgxMaskDirective } from 'ngx-mask';
import { VoluntarioService } from '../../service/voluntario/voluntario.service';

interface AreaInteresse {
  id: string;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-voluntario',
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './voluntario.component.html',
  styleUrl: './voluntario.component.css'
})
export class VoluntarioComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly User = User;
  readonly Heart = Heart;
  readonly Stethoscope = Stethoscope;
  readonly Users = Users;
  readonly Car = Car;
  readonly Camera = Camera;
  readonly Megaphone = Megaphone;
  readonly Building2 = Building2;
  readonly Star = Star;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
  readonly CircleAlert = CircleAlert;
  
  submitting = signal(false);
  submitted = signal(false);
  errorMessage = signal<string | null>(null);

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly voluntaryService = inject(VoluntarioService);

  readonly voluntarioForm = this.fb.group({
      voluntaryName: ['', [Validators.required]],
      voluntaryEmail: ['', [Validators.required, Validators.email]],
      voluntaryPhone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      voluntaryBirthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      voluntaryOccupation: [''],
      voluntaryInterestArea: this.fb.array<string>([], [Validators.required, Validators.minLength(1)]),
      voluntaryAvailability: this.fb.array<string>([], [Validators.required, Validators.minLength(1)]),
      voluntaryExperience: [''],
      voluntaryMotivation: [''],
      hasTransportation: [false],
      hasRescueExperience: [false],
      canWorkOnWeekends: [false],
      voluntarySpecialSkills: ['']
  });

  get disponibilidadesArray(): FormArray {
    return this.voluntarioForm.get('voluntaryAvailability') as FormArray;
  }

  get areasInteresseArray(): FormArray {
    return this.voluntarioForm.get('voluntaryInterestArea') as FormArray;
  }

  toggleDisponibilidade(disponibilidade: string) {
    const index = this.disponibilidadesArray.value.indexOf(disponibilidade);

    if (index === -1) {
      this.disponibilidadesArray.push(this.fb.control(disponibilidade));
    } else {
      this.disponibilidadesArray.removeAt(index);
    }
  }

  hasError(fieldName: string): boolean {
    const field = this.voluntarioForm.get(fieldName);
    return !!(field?.invalid && (field.dirty || field.touched));
  }

    getErrorMessage(fieldName: string): string {
    const field = this.voluntarioForm.get(fieldName);
    
    if (!field?.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) return 'Este campo é obrigatório';
    if (errors['email']) return 'Email inválido';
    if (errors['pattern']) return 'Formato inválido';
    
    return 'Campo inválido';
  }

  toggleArea(areaId: string) {
    const index = this.areasInteresseArray.value.indexOf(areaId);

    if (index === -1) {
      this.areasInteresseArray.push(this.fb.control(areaId));
    } else {
      this.areasInteresseArray.removeAt(index);
    }
  }

  areasInteresse: AreaInteresse[] = [
    { id: "Resgates", label: "Resgates de Animais", icon: Heart },
    { id: "Cuidados", label: "Cuidados Diários", icon: Stethoscope },
    { id: "Adocao", label: "Feiras de Adoção", icon: Users },
    { id: "Transporte", label: "Transporte de Animais", icon: Car },
    { id: "Fotografia", label: "Fotografia", icon: Camera },
    { id: "Marketing", label: "Marketing e Divulgação", icon: Megaphone },
    { id: "Administrativo", label: "Trabalho Administrativo", icon: Building2 },
    { id: "Fundraising", label: "Captação de Recursos", icon: Star }
  ];

  disponibilidades = [
    "Segunda manhã",
    "Segunda tarde", 
    "Terça manhã",
    "Terça tarde",
    "Quarta manhã", 
    "Quarta tarde",
    "Quinta manhã",
    "Quinta tarde",
    "Sexta manhã",
    "Sexta tarde",
    "Sábado manhã",
    "Sábado tarde",
    "Domingo manhã", 
    "Domingo tarde"
  ];

  onSubmit(): void {
    if (this.voluntarioForm.invalid) {
      this.voluntarioForm.markAllAsTouched();
      this.errorMessage.set('Corrija os erros do formulário antes de enviar.');
      return;
    };

    this.errorMessage.set(null);
    this.submitting.set(true);

    const payload = this.voluntarioForm.getRawValue();

    this.voluntaryService.createVoluntary(payload).subscribe({
      next: () => {
        this.submitted.set(true);
        this.voluntarioForm.reset();
      },
      error: (err) => {
        if(err.status != 500 && err.error?.message) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('Ocorreu um erro ao enviar o formulário. Tente novamente');
        }
        this.submitting.set(false);
      }
    });
  }

}