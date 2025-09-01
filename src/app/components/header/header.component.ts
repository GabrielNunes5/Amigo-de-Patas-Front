import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Heart, Home, LucideAngularModule, Menu, PawPrint, Phone, Users, X, } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideAngularModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  mobileMenuOpen = false;  
  navigationItems = [
    {title: "Início", url: "/", icon: Home},
    {title: 'Animais', url: '/animais', icon: Heart },
    {title: 'Sobre Nós', url: '/sobre', icon: Users },
    {title: 'Contato', url: '/contato', icon: Phone }
  ]
  constructor(public router: Router) {}
  readonly PawPrint = PawPrint;
  readonly Menu = Menu;
  readonly X = X;
}
