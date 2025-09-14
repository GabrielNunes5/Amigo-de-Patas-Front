import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckCircle, LucideAngularModule, Mail, MessageSquare, Phone, User } from 'lucide-angular';
import { Animal, AdocaoFormData } from '../../models/animal.model'; 
import { AnimalService } from '../../service/animal.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-adoption-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, NgxMaskDirective],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent implements OnInit {
  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MessageSquare = MessageSquare;
  readonly CheckCircle = CheckCircle;

  animal = input.required<Animal>();
  showForm = input<boolean>(false);
  
  formCancelled = output<void>();
  formSubmitted = output<void>();

  submitted = signal(false);
  submitting = signal(false);
  
  adoptionForm!: FormGroup;

  private readonly animalService = inject(AnimalService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.adoptionForm = this.fb.group({
      nome_interessado: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      tipo_moradia: [''],
      tem_quintal: [false],
      experiencia_animais: [''],
      outros_animais: [''],
      mensagem: ['']
    });
  }

  cancelarFormulario(): void {
    this.adoptionForm.reset();
    this.formCancelled.emit();
  }

  async onSubmit(): Promise<void> {
    if (this.adoptionForm.invalid) return;

    this.submitting.set(true);

    try {
      const formData: AdocaoFormData = {
        ...this.adoptionForm.value,
        animal_id: this.animal().animalId,
        animal_name: this.animal().animalName
      };

      await this.animalService.enviarSolicitacaoAdocao(formData);
      
      this.submitted.set(true);
      this.formSubmitted.emit();
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      // TODO: Implementar tratamento de erro mais robusto
    } finally {
      this.submitting.set(false);
    }
  }

  hasError(fieldName: string): boolean {
    const field = this.adoptionForm.get(fieldName);
    return !!(field?.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.adoptionForm.get(fieldName);
    
    if (!field?.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) return 'Este campo é obrigatório';
    if (errors['email']) return 'Email inválido';
    if (errors['pattern']) return 'Formato inválido';
    
    return 'Campo inválido';
  }
}