import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CircleAlert, KeyRound, LucideAngularModule } from 'lucide-angular';
import { finalize, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly forgotPasswordForm = this.fb.group({
    adopterEmail: ['', [Validators.required, Validators.email]],
  });

  isSuccess = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  readonly CircleAlert = CircleAlert;
  readonly KeyRound = KeyRound;

  submit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      this.errorMessage.set('Corrija os erros do formulário antes de enviar.');
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const { adopterEmail } = this.forgotPasswordForm.getRawValue();

    this.auth.forgotPassword(adopterEmail).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      ).subscribe({
        next: () => {
          this.isSuccess.set(true);
        },
        error: () => {
          this.errorMessage.set('Ocorreu um erro ao enviar o e-mail. Tente novamente.');
        }
      });
  }
}