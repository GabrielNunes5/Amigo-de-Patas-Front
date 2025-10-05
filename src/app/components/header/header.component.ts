import { Component, HostListener, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Home, Menu, PawPrint, Phone, Users, X, LogIn, LogOut } from 'lucide-angular';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  navigationItems = [
    { title: 'Início', url: '/', icon: Home },
    { title: 'Animais', url: '/animais', icon: Heart },
    { title: 'Sobre Nós', url: '/sobre', icon: Users },
    { title: 'Contato', url: '/contato', icon: Phone }
  ];

  readonly router = inject(Router);
  public auth = inject(AuthService);

  readonly currentUser = computed(() => {
    const user = this.auth.user();
    return user;
  });

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
  readonly LogIn = LogIn;
  readonly LogOut = LogOut;

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.loadUserProfile();
    }
  }

  getFirstTwoNames(fullName: string | undefined): string {
    if (!fullName) return '';
    
    const names = fullName.split(' ');
    return names.slice(0, 2).join(' ');
  }
}
