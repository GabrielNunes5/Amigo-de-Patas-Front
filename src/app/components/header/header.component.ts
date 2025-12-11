import { Component, HostListener, inject, signal, computed, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Home, Menu, PawPrint, Phone, Users, X, LogIn, LogOut } from 'lucide-angular';
import { AuthService } from '../../service/auth/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  readonly isScrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly isDropdownOpen = signal(false);

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

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((v) => !v);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 10);
    if (this.isDropdownOpen()) {
      this.closeDropdown();
    }
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeDropdown();
        this.closeMobileMenu();
      })
      
    if (this.auth.isAuthenticated()) {
      this.auth.loadUserProfile();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getFirstTwoNames(fullName: string | undefined): string {
    if (!fullName) return '';
    
    const names = fullName.split(' ');
    return names.slice(0, 2).join(' ');
  }

  readonly PawPrint = PawPrint;
  readonly Menu = Menu;
  readonly X = X;
  readonly LogIn = LogIn;
  readonly LogOut = LogOut;
}
