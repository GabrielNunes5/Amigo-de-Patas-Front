import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-cancel',
  imports: [],
  templateUrl: './donation-cancel.component.html',
  styleUrl: './donation-cancel.component.css'
})
export class DonationCancelComponent {

  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToDonationPage(): void {
    this.router.navigate(['/doacao']);
  }
}
