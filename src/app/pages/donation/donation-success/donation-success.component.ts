import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-success',
  imports: [],
  templateUrl: './donation-success.component.html',
  styleUrl: './donation-success.component.css'
})
export class DonationsuccessComponent {

  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToDonationPage(): void {
    this.router.navigate(['/doacao']);
  }
}
