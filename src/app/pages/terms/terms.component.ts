import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ScrollText } from 'lucide-angular';

@Component({
  selector: 'app-terms',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent {
  readonly ScrollText = ScrollText;
}
