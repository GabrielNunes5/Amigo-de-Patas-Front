import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, switchMap } from 'rxjs';
import { LucideAngularModule, User, CircleAlert, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../service/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterLink, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly registerForm = this.fb.group({
    adopterFullName: ['', [Validators.required]],
    adopterBirthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    adopterCPF: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    adopterEmail: ['', [Validators.required, Validators.email]],
    adopterPassword: [
      '',
      [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
    ],
    adopterPhone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    adopterAddress: ['', [Validators.required]],
    typeHouse: ['', [Validators.required]],
    hasGarden: [false]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  passwordVisible = signal(false);

  readonly User = User;
  readonly CircleAlert = CircleAlert;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage.set('Corrija os erros do formulário antes de enviar.');
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const payload = this.registerForm.getRawValue();

    this.auth.register(payload)
      .pipe(
        switchMap(() => this.auth.profile()),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: unknown) => this.handleError(err)
      });
  }

  togglePassword(): void {
    this.passwordVisible.update(value => !value);
  }

  private handleError(err: unknown): void {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 400) {
      const error = err.error;

      if (error?.mensagens && typeof error.mensagens === 'object') {
        const mensagens = Object.values(error.mensagens);
        this.errorMessage.set(mensagens.join('\n'));
        return;
      }

      if (error?.error) {
        this.errorMessage.set(error.error);
        return;
      }

      if (error?.message) {
        this.errorMessage.set(error.message);
        return;
      }

      this.errorMessage.set('Dados inválidos. Verifique o formulário.');
      return;
    }

    this.errorMessage.set('Erro inesperado. Tente novamente.');
    console.error(err);
  }
  }

}
