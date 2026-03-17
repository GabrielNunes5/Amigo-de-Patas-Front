import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CircleAlert, Eye, EyeOff, KeyRound, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly tokenUrl = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  
  private readonly token = this.tokenUrl.snapshot.queryParamMap.get('token') || '';

  isSuccess = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  passwordVisible = signal(false);

  readonly CircleAlert = CircleAlert;
  readonly KeyRound = KeyRound;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  
  readonly resetPassword = this.fb.group({
    adopterPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    adopterConfirmPassword: ['', [Validators.required]]
  });

  togglePassword(): void {
    this.passwordVisible.update(value => !value);
  }

  submit(): void {
    if (this.resetPassword.invalid) {
      this.resetPassword.markAllAsTouched();
      this.errorMessage.set('Corrija os erros do formulário antes de enviar.');
      return;
    }

    if (!this.token) {
      this.errorMessage.set('Token inválido ou expirado.');
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const { adopterPassword, adopterConfirmPassword } = this.resetPassword.getRawValue();

    this.auth.resetPassword(adopterPassword, adopterConfirmPassword, this.token).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () =>{
        this.isSuccess.set(true);
      },
      error: (err) => {
        console.error('Erro ao redefinir senha:', err);
        this.errorMessage.set('Ocorreu um erro ao redefinir a senha. Tente novamente.' );
      }
    })
  }
}
