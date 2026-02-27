import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DonationService } from '../../service/donation/donation.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Banknote, CreditCard, LucideAngularModule } from 'lucide-angular';

type MetodoPagamento = 'cartao' | 'pix';

@Component({
  selector: 'app-donation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  private readonly donationService = inject(DonationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly metodo = signal<MetodoPagamento>('cartao');

  readonly valoresPreset = [10, 25, 50, 100] as const;

  readonly loading = signal<boolean>(false);
  readonly valorSelecionado = signal<number>(25);
  readonly valorCustom = signal<number | null>(null);
  readonly modoCustom = signal<boolean>(false);

  readonly CreditCard = CreditCard;
  readonly BankNote = Banknote;


  readonly valorFinal = computed(() => {
    if (this.modoCustom()) {
      return Number(this.valorCustom()) || 0;
    }
    return this.valorSelecionado();
  });

  selecionarValor(valor: number): void {
    this.valorSelecionado.set(valor);
    this.modoCustom.set(false);
    this.valorCustom.set(null);
  }

  ativarCustom(): void {
    this.modoCustom.set(true);
  }

  atualizarValorCustom(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valorCustom.set(Number(input.value));
  }

  submit(): void {
    const valor = this.valorFinal();
    if (valor < 1) {
      alert('Valor mínimo é R$ 1,00');
      this.loading.set(false);
      return;
    }
    const payload = {
      donationAmount: Math.round(valor * 100),
    };

    this.loading.set(true);

    this.donationService.createDonation(payload)
      .pipe(takeUntilDestroyed(this.destroyRef),)
      .subscribe({
        next: (res) => {
          window.location.assign(res.checkoutUrl);
        },
        error: (err) => {
          this.loading.set(false);
          alert('Erro ao iniciar pagamento. Tente novamente.');
          console.error('Erro ao criar doação', err);
        }
      });
  }

  readonly metodoClasses = computed(() =>
    this.modoCustom() 
    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-none' 
    : 'border-gray-300 text-gray-700 hover:border-orange-400'
  )

  readonly pixClasses = computed(() =>
    this.metodo() === 'pix'
      ? 'border-green-500 bg-green-50 text-green-700'
      : 'border-gray-200 text-gray-600 hover:border-green-300'
  );

  readonly cartaoClasses = computed(() =>
    this.metodo() === 'cartao'
      ? 'border-blue-500 bg-blue-50 text-blue-700'
      : 'border-gray-200 text-gray-600 hover:border-blue-300'
  );

  valorClasses(val: number): string {
    const ativo =
      !this.modoCustom() &&
      this.valorSelecionado() === val;

    return ativo
      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-none'
      : 'border-gray-300 text-gray-700 hover:border-orange-400';
  }
}