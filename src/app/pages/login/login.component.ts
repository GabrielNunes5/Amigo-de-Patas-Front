import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CircleAlert, LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loginForm = this.fb.group({
    adopterEmail: ['', [Validators.required, Validators.email]],
    adopterPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly User = User;
  readonly CircleAlert = CircleAlert;

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Corrija os erros do formulário antes de enviar.');
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const payload = this.loginForm.getRawValue();

    this.auth
      .login(payload)
      .pipe(
        switchMap(() => this.auth.profile()),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: unknown) => this.handleError(err),
      });
  }

  private handleError(err: unknown): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.errorMessage.set('Credenciais inválidas. Verifique email e senha.');
        return;
      }
      if (err.status === 400) {
        const msg = (err.error && (err.error as any).message) ?? 'Requisição inválida.';
        this.errorMessage.set(msg);
        return;
      }
      if (err.status === 0) {
        this.errorMessage.set('Não foi possível conectar ao servidor. Verifique sua conexão.');
        return;
      }
      const fallback = (err.error && (err.error as any).message) ?? 'Erro inesperado. Tente novamente.';
      this.errorMessage.set(fallback);
      return;
    }

    this.errorMessage.set('Erro inesperado. Tente novamente.');
    console.error(err);
  }

  get emailControl() {
    return this.loginForm.controls.adopterEmail;
  }

  get passwordControl() {
    return this.loginForm.controls.adopterPassword;
  }
}
