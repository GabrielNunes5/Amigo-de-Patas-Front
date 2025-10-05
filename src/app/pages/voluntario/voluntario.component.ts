import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArrowLeft, Building2, Camera, Car, CheckCircle, Clock, Heart, LucideAngularModule, Megaphone, Star, Stethoscope, User, Users } from 'lucide-angular';
import { NgxMaskDirective } from 'ngx-mask';

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
export class VoluntarioComponent implements OnInit {
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
  
  voluntarioForm!: FormGroup;
  submitting = signal(false);
  submitted = signal(false);

  ngOnInit(): void {
    this.initializeForm();
  }

  private readonly fb = inject(FormBuilder);

  private initializeForm(): void {
    this.voluntarioForm = this.fb.group({
      nome_completo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      idade: [''],
      profissao: [''],
      areas_interesse: this.fb.array<string>([]),
      disponibilidade: this.fb.array<string>([]),
      experiencia_animais: [''],
      motivacao: [''],
      tem_transporte: [false],
      tem_experiencia_resgate: [false],
      pode_trabalhar_fins_semanas: [false],
      habilidades_especiais: ['']
    })
  }

  get disponibilidadesArray(): FormArray {
    return this.voluntarioForm.get('disponibilidade') as FormArray;
  }

  get areasInteresseArray(): FormArray {
    return this.voluntarioForm.get('areas_interesse') as FormArray;
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
    { id: "resgates", label: "Resgates de Animais", icon: Heart },
    { id: "cuidados", label: "Cuidados Diários", icon: Stethoscope },
    { id: "adocao", label: "Feiras de Adoção", icon: Users },
    { id: "transporte", label: "Transporte de Animais", icon: Car },
    { id: "fotografia", label: "Fotografia", icon: Camera },
    { id: "marketing", label: "Marketing e Divulgação", icon: Megaphone },
    { id: "administrativo", label: "Trabalho Administrativo", icon: Building2 },
    { id: "fundraising", label: "Captação de Recursos", icon: Star }
  ];

  disponibilidades = [
    "Segunda-feira manhã",
    "Segunda-feira tarde", 
    "Terça-feira manhã",
    "Terça-feira tarde",
    "Quarta-feira manhã", 
    "Quarta-feira tarde",
    "Quinta-feira manhã",
    "Quinta-feira tarde",
    "Sexta-feira manhã",
    "Sexta-feira tarde",
    "Sábado manhã",
    "Sábado tarde",
    "Domingo manhã", 
    "Domingo tarde"
  ];

  async onSubmit(): Promise<void> {
    if (this.voluntarioForm.invalid) return;

    this.submitting.set(true);

    try {
      this.submitted.set(true);
      this.voluntarioForm.reset();
    } catch (err) {
      console.error('Erro ao enviar inscrição:', err);
    } finally {
      this.submitting.set(false);
    }
  }
}
