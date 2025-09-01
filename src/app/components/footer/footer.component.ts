import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PawPrint } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly PawPrint = PawPrint;
}
