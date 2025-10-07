import { CommonModule } from '@angular/common';
import { Component, computed, effect, EffectRef, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckCircle, LucideAngularModule, MessageSquare } from 'lucide-angular';
import { Animal, AdocaoFormData } from '../../models/animal.model';
import { AnimalService } from '../../service/animal/animal.service';
import { AuthService } from '../../service/auth/auth.service';
import { RouterLink } from '@angular/router';

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
  private readonly animalService = inject(AnimalService);
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

  async onSubmit(): Promise<void> {
    if (this.adoptionForm.invalid) return;

    this.submitting.set(true);

    try {
      const formData: AdocaoFormData = {
        animal_id: this.animal().animalId,
        animal_name: this.animal().animalName,
        experiencia_animais: this.adoptionForm.value.experiencia_animais!,
        outros_animais: this.adoptionForm.value.outros_animais!,
        mensagem: this.adoptionForm.value.mensagem!,
      };

      await this.animalService.enviarSolicitacaoAdocao(formData);

      this.submitted.set(true);
      this.formSubmitted.emit();
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      // TODO: exibir toast ou mensagem de erro amigável
    } finally {
      this.submitting.set(false);
    }
  }
}
