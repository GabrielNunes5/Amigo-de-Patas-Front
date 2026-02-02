import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckCircle, LucideAngularModule, MessageSquare } from 'lucide-angular';
import { Animal, AdocaoFormData } from '../../models/animal.model';
import { AuthService } from '../../service/auth/auth.service';
import { RouterLink } from '@angular/router';
import { AdoptionFormService } from '../../service/adoptionForm/adoptionForm.service';

@Component({
  selector: 'app-adoption-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css',
})
export class AdoptionFormComponent {
  readonly CheckCircle = CheckCircle;
  readonly MessageSquare = MessageSquare;

  private readonly fb = inject(FormBuilder);
  private readonly adoptionService = inject(AdoptionFormService);
  private readonly auth = inject(AuthService);

  animal = input.required<Animal>();
  showForm = input<boolean>(false);

  formCancelled = output<void>();
  formSubmitted = output<void>();

  readonly isAuthenticated = computed(() => this.auth.isAuthenticated());
  readonly currentUser = computed(() => this.auth.user());
  readonly showError = signal(false);

  readonly submitting = signal(false);
  readonly submitted = signal(false);

  readonly adoptionForm = this.fb.nonNullable.group({
    experiencia_animais: ['', [Validators.maxLength(255)]],
    outros_animais: ['', [Validators.maxLength(255)]],
    mensagem: ['', [Validators.maxLength(255)]],
  });

  canShowForm(): boolean {
    return this.showForm() && this.isAuthenticated();
  }

  shouldShowError(): boolean {
    return this.showForm() && !this.isAuthenticated();
  }

  cancelarFormulario(): void {
    this.adoptionForm.reset();
    this.formCancelled.emit();
  }

  onSubmit(): void {
    if (this.adoptionForm.invalid) return;

    this.submitting.set(true);

    const payload: Partial<AdocaoFormData> = {
      animalId: this.animal().animalId,
      experience: this.adoptionForm.value.experiencia_animais || undefined,
      otherAnimals: this.adoptionForm.value.outros_animais || undefined,
      message: this.adoptionForm.value.mensagem || undefined,
    };

    this.adoptionService.createAdoptionForm(payload).subscribe({
      next: () => {
        this.submitted.set(true);
        this.formSubmitted.emit();
        this.submitting.set(false);
      },
      error: err => {
        console.error('Erro ao enviar solicitação:', err);
        this.submitting.set(false);
      }
    });
  }
}
