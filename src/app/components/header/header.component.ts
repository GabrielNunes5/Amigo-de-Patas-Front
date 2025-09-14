import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Home, Menu, PawPrint, Phone, Users, X } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  navigationItems = [
    { title: 'Início', url: '/', icon: Home },
    { title: 'Animais', url: '/animais', icon: Heart },
    { title: 'Sobre Nós', url: '/sobre', icon: Users },
    { title: 'Contato', url: '/contato', icon: Phone }
  ];

  constructor(public router: Router) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  readonly PawPrint = PawPrint;
  readonly Menu = Menu;
  readonly X = X;
}
